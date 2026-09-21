<?php
// The order form's handler, and the only server code on the site.
//
// It stores nothing. It turns a form into one email to hello@happyherogames.com and forgets it:
// no database, no third party, no cookies, no log of its own. That is deliberate. Every page
// here promises that a child's details do not go to anyone else, and a form posting to someone
// else's service would break that promise the day it was added.
//
// Spam: a honeypot field a person never sees and a bot usually fills. It is quietly accepted and
// thrown away, so the bot has nothing to learn from.

$SITE  = 'https://happyherogames.com';
$TO    = 'hello@happyherogames.com';

// the form carries the language of the page it was on, so the thank-you comes back in it
$LANGS = ['en', 'es', 'de', 'fr', 'it', 'ga'];
$lang  = in_array(($_POST['lang'] ?? 'en'), $LANGS, true) ? $_POST['lang'] : 'en';
$here  = $SITE . ($lang === 'en' ? '/' : '/' . $lang . '/');
$THANKS = $here . 'order/thanks/';

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') { header('Location: ' . $SITE . '/order/'); exit; }

// one line of text, capped, with anything that could forge a mail header taken out
function field(string $key, int $max = 300): string {
    $v = trim((string)($_POST[$key] ?? ''));
    $v = str_replace(["\r", "\n", "\0"], ' ', $v);
    return mb_substr($v, 0, $max);
}
// a paragraph: newlines are fine, headers are not built from it
function block(string $key, int $max = 2000): string {
    $v = trim((string)($_POST[$key] ?? ''));
    $v = str_replace("\0", '', $v);
    return mb_substr($v, 0, $max);
}

if (field('website', 80) !== '') { header('Location: ' . $THANKS); exit; }   // the honeypot

$email    = field('email', 120);
$from     = field('from', 80);
$hero     = field('hero', 60);
$occasion = field('occasion', 40);
$tier     = field('tier', 60);
$game     = field('game', 900);
// merch arrives as several ticked boxes with one name, so it is read as a list
$merchIn  = isset($_POST['merch']) ? (array)$_POST['merch'] : [];
$merch    = implode(', ', array_filter(array_map(fn($m) => in_array($m, ['t-shirt', 'poster', 'mug'], true) ? $m : '', $merchIn)));
$look     = field('look', 120);
$giver    = field('giver', 40);
$note     = field('note', 140);
$cast     = block('cast');
$about    = block('about');

$valid = filter_var($email, FILTER_VALIDATE_EMAIL) && $hero !== '';

// The link to send, built from what the form knows, so fulfilling a basic order is one paste.
// The family and the jokes come later, from the reply; add them and the link changes with them.
$lookParts = preg_split('/\s+/', $look);
$occMap = ['A birthday' => 'birthday', 'Christmas' => 'christmas', "Father's Day" => 'fathers', "Mother's Day" => 'mothers', 'Just because' => 'star'];
$cfg = [
    'hero' => array_filter(['name' => $hero, 'hair' => $lookParts[0] ?? null, 'hairCol' => $lookParts[1] ?? null,
                            'skin' => $lookParts[2] ?? null, 'kit' => $lookParts[3] ?? null]),
    'occasion' => $occMap[$occasion] ?? 'birthday',
];
if ($giver !== '') $cfg['from'] = $giver;
if ($note !== '') $cfg['note'] = $note;
$b64 = rtrim(strtr(base64_encode(json_encode($cfg, JSON_UNESCAPED_UNICODE)), '+/', '-_'), '=');
$one = strpos($tier, '$39') === 0 ? '&n=1' : '';
$playLink = $SITE . '/g/play/#g=' . $b64 . $one;
if (!$valid) { header('Location: ' . $here . 'order/?sorry=1'); exit; }

$lines = [
    'Hero:      ' . $hero,
    'Occasion:  ' . ($occasion ?: '(not said)'),
    'Wants:     ' . ($tier ?: '(not said)'),
    'Merch:     ' . ($merch ?: 'none') . ($merch ? '   (send a proof and a price)' : ''),
    'Upgrading: ' . ($game !== '' ? 'https://happyherogames.com/g/play/#' . $game : 'no'),
    'Look:      ' . ($look ?: '(not set)') . '   [hair, hair colour, skin, shirt]',
    'From:      ' . ($giver ?: '(not said)') . '   (shown as "made by" on their game)',
    'Message:   ' . ($note !== '' ? '"' . $note . '"' : '(none)'),
    '',
    'Link to send once paid:',
    '  ' . $playLink,
    'From:      ' . ($from ?: '(no name given)') . ' <' . $email . '>',
    '',
    'Who else is in it:',
    $cast !== '' ? $cast : '(not said)',
    '',
    'About them:',
    $about !== '' ? $about : '(not said)',
    '',
    'Sent from the order form at ' . $here . 'order/ (' . $lang . ')',
];

$headers = implode("\r\n", [
    'From: HappyHeroGames <' . $TO . '>',     // our own domain, so it passes SPF
    'Reply-To: ' . $email,
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: happyherogames-order',
]);

$sent = @mail($TO, 'Order: a game for ' . $hero, implode("\n", $lines), $headers);
header('Location: ' . ($sent ? $THANKS : $here . 'order/?sorry=1'));
