import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { createServer } from 'vite';
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';

// Exercise React state in a DOM. Native dialog focus trapping and visual layout
// still need a real-browser check; these shims only supply missing DOM APIs.
test('portfolio preserves content and interactive behavior after React migration', async () => {
  const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', { url: 'http://localhost/', pretendToBeVisual: true });
  const values = {
    window: dom.window, document: dom.window.document,
    localStorage: dom.window.localStorage,
    requestAnimationFrame: callback => setTimeout(callback, 0),
    cancelAnimationFrame: clearTimeout,
    innerHeight: 900,
    addEventListener: dom.window.addEventListener.bind(dom.window),
    removeEventListener: dom.window.removeEventListener.bind(dom.window),
    ResizeObserver: class { observe() {} disconnect() {} },
    IS_REACT_ACT_ENVIRONMENT: true,
  };
  for (const [key, value] of Object.entries(values)) globalThis[key] = value;
  dom.window.matchMedia = () => ({ matches: true, addEventListener() {}, removeEventListener() {} });
  dom.window.HTMLDialogElement.prototype.showModal = function () { this.setAttribute('open', ''); };
  dom.window.HTMLDialogElement.prototype.close = function () { this.removeAttribute('open'); };
  const server = await createServer({ server: { middlewareMode: true, watch: null, ws: false }, appType: 'custom' });
  let root;
  try {
    const { default: App } = await server.ssrLoadModule('/src/App.jsx');
    root = createRoot(document.getElementById('root'));
    await act(async () => root.render(React.createElement(App)));
    const click = async node => { assert.ok(node, 'control exists'); await act(async () => node.dispatchEvent(new dom.window.MouseEvent('click', { bubbles: true }))); };

    assert.equal(document.querySelectorAll('h1').length, 1);
    assert.match(document.querySelector('h1').textContent, /Apoorva Lambat/);
    assert.ok(document.querySelector('img.portrait-photo').getAttribute('src').endsWith('apoorva-portrait.jpg'));
    document.querySelectorAll('.nav-links a').forEach(link => assert.ok(document.querySelector(link.getAttribute('href')), 'navigation target exists'));

    await click(document.getElementById('tab-interests'));
    assert.equal(document.getElementById('panel-interests').hidden, false);
    assert.equal(document.getElementById('panel-story').hidden, true);
    await act(async () => document.getElementById('tab-interests').dispatchEvent(new dom.window.KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })));
    assert.equal(document.getElementById('tab-personal').getAttribute('aria-selected'), 'true');

    await click(document.querySelector('[data-filter="materials"]'));
    assert.equal([...document.querySelectorAll('.project-card')].filter(card => !card.hidden).length, 1);
    assert.equal(document.querySelector('.project-card:not([hidden])').dataset.category, 'materials');
    assert.match(document.getElementById('project-status').textContent, /1 project$/);
    await click(document.querySelector('[data-project="bricks"]'));
    assert.match(document.querySelector('dialog[open] h2').textContent, /plastic waste/i);
    await click(document.querySelector('dialog .dialog-close'));
    assert.equal(document.querySelectorAll('dialog').length, 0);

    await click(document.querySelector('.theme-toggle'));
    assert.equal(document.documentElement.dataset.theme, 'dark');
    assert.equal(localStorage.getItem('apoorva-theme'), 'dark');
    await click(document.querySelector('.menu-toggle'));
    assert.equal(document.querySelector('.menu-toggle').getAttribute('aria-expanded'), 'true');
    await click(document.querySelector('.nav-links a[href="#contact"]'));
    assert.equal(document.querySelector('.menu-toggle').getAttribute('aria-expanded'), 'false');

    await click(document.getElementById('placeholder-toggle'));
    assert.ok(document.querySelector('.highlight-placeholders'));
    await click(document.querySelector('.nav-actions .button'));
    assert.match(document.querySelector('dialog[open] h2').textContent, /resume belongs here/i);
    await act(async () => document.querySelector('dialog').dispatchEvent(new dom.window.Event('cancel', { cancelable: true })));
    assert.equal(document.querySelectorAll('dialog').length, 0);
    assert.equal(document.querySelectorAll('#experience details[open]').length, 0);
  } finally {
    if (root) await act(async () => root.unmount());
    await server.close();
    dom.window.close();
    for (const key of Object.keys(values)) delete globalThis[key];
  }
});
