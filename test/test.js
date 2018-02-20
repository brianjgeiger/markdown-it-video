/* eslint func-names: ["error", "never"] */
var path = require('path');
var generate = require('markdown-it-testgen');
var assert = require('assert');

function getMfrId(html) {
  return html.split('"')[1];
}

describe('markdown-it-video', function () {
  var md = require('markdown-it')({
    html: true,
    linkify: true,
    typography: true,
  }).use(require('../'));
  generate(path.join(__dirname, 'fixtures/video.txt'), md);
});

// Because the mfr iframe requires a random id these tests cannont be part of
// the markdown-it-testgen fixture
describe('markdown-it-mfr', function () {
  var md = require('markdown-it')({
    html: true,
    linkify: true,
    typography: true,
  }).use(require('../'));
  var renderedHtml;
  var id;

  it('make sure normal iframe generates properly when empty', function () {
    renderedHtml = md.render('@[osf]()');
    id = getMfrId(renderedHtml);
    assert.equal(renderedHtml, '<p></p>\n');
  });

  it('make sure normal iframe generates properly with guid', function () {
    renderedHtml = md.render('@[osf](xxxxx)');
    id = getMfrId(renderedHtml);
    assert.equal(renderedHtml, '<p><div id="' + id + '" class="mfr mfr-file"></div><script>$(document).ready(function () {new mfr.Render("' + id + '", "https://mfr.osf.io/render?url=https://osf.io/xxxxx/?action=download%26mode=render");    }); </script></p>\n');
  });

  it('make sure normal iframe generates properly with guid and line break', function () {
    renderedHtml = md.render('@[osf](xxxxx\n)');
    id = getMfrId(renderedHtml);
    assert.equal(renderedHtml, '<p><div id="' + id + '" class="mfr mfr-file"></div><script>$(document).ready(function () {new mfr.Render("' + id + '", "https://mfr.osf.io/render?url=https://osf.io/xxxxx/?action=download%26mode=render");    }); </script></p>\n');
  });

  it('make sure normal iframe generates properly with guid and extra space', function () {
    renderedHtml = md.render('@[osf](xxxxx )');
    id = getMfrId(renderedHtml);
    assert.equal(renderedHtml, '<p><div id="' + id + '" class="mfr mfr-file"></div><script>$(document).ready(function () {new mfr.Render("' + id + '", "https://mfr.osf.io/render?url=https://osf.io/xxxxx/?action=download%26mode=render");    }); </script></p>\n');
  });

  it('make sure normal iframe generates properly with guid and two extra spaces', function () {
    renderedHtml = md.render('@[osf]( xxxxx )');
    id = getMfrId(renderedHtml);
    assert.equal(renderedHtml, '<p><div id="' + id + '" class="mfr mfr-file"></div><script>$(document).ready(function () {new mfr.Render("' + id + '", "https://mfr.osf.io/render?url=https://osf.io/xxxxx/?action=download%26mode=render");    }); </script></p>\n');
  });

  it('make sure normal iframe generates properly with link', function () {
    renderedHtml = md.render('@[osf](https://mfr.osf.io/render?url=https://osf.io/xxxxx/?action=download%26mode=render)');
    id = getMfrId(renderedHtml);
    assert.equal(renderedHtml, '<p><div id="' + id + '" class="mfr mfr-file"></div><script>$(document).ready(function () {new mfr.Render("' + id + '", "https://mfr.osf.io/render?url=https://osf.io/xxxxx/?action=download%26mode=render");    }); </script></p>\n');
  });

  it('make sure normal iframe generates properly with link and extra space', function () {
    renderedHtml = md.render('@[osf](https://mfr.osf.io/render?url=https://osf.io/xxxxx/?action=download%26mode=render )');
    id = getMfrId(renderedHtml);
    assert.equal(renderedHtml, '<p><div id="' + id + '" class="mfr mfr-file"></div><script>$(document).ready(function () {new mfr.Render("' + id + '", "https://mfr.osf.io/render?url=https://osf.io/xxxxx/?action=download%26mode=render");    }); </script></p>\n');
  });

  it('make sure normal iframe generates properly with link and two extra spaces', function () {
    renderedHtml = md.render('@[osf](https://mfr.osf.io/render?url=https://osf.io/xxxxx/?action=download%26mode=render )');
    id = getMfrId(renderedHtml);
    assert.equal(renderedHtml, '<p><div id="' + id + '" class="mfr mfr-file"></div><script>$(document).ready(function () {new mfr.Render("' + id + '", "https://mfr.osf.io/render?url=https://osf.io/xxxxx/?action=download%26mode=render");    }); </script></p>\n');
  });
});
