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
$date     = field('date', 40);
$pick     = field('pick', 40);
$speed    = field('speed', 60);
$sibling  = field('sibling', 10) === 'yes' ? 'YES, a second game at $69' : 'no';
$cast     = block('cast');
$about    = block('about');

$valid = filter_var($email, FILTER_VALIDATE_EMAIL) && $hero !== '';
if (!$valid) { header('Location: ' . $here . 'order/?sorry=1'); exit; }

$lines = [
    'Hero:      ' . $hero,
    'Occasion:  ' . ($occasion ?: '(not said)'),
    'Needed by: ' . ($date ?: '(not said)'),
    'Wants:     ' . ($pick ?: '(not said)'),
    'Speed:     ' . ($speed ?: '(not said)'),
    'Sibling:   ' . $sibling,
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
