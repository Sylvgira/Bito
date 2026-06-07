(function () {
  const install = (attempt = 0) => {
    const CMS = window.CMS;
    const createClass = window.createClass;
    const h = window.h;

    if (!CMS || !createClass || !h) {
      if (attempt < 100) {
        window.setTimeout(() => install(attempt + 1), 100);
        return;
      }
      return;
    }

    if (window.__CLIENT_TEMPLATE_PREVIEWS_REGISTERED) return;
    window.__CLIENT_TEMPLATE_PREVIEWS_REGISTERED = true;

    CMS.registerPreviewStyle('/admin/preview.css');

    const getValue = (entry, path, fallback = '') => {
      const value = entry.getIn(['data'].concat(path));
      if (value === undefined || value === null) return fallback;
      return value && typeof value.toJS === 'function' ? value.toJS() : value;
    };

    const text = (value, fallback = '') => value || fallback;

    const button = (label, secondary) =>
      label
        ? h(
            'span',
            {
              className: secondary
                ? 'cms-preview__button cms-preview__button--secondary'
                : 'cms-preview__button'
            },
            label
          )
        : null;

    const HomePreview = createClass({
      render() {
        const entry = this.props.entry;
        const heroVariant = getValue(entry, ['hero', 'variant'], 'simple');
        const mediaPosition = getValue(entry, ['hero', 'mediaPosition'], 'right');
        const highlights = getValue(entry, ['hero', 'highlights'], []);
        const showPanel = heroVariant !== 'centered';

        return h('main', { className: 'cms-preview' }, [
          h('section', { className: 'cms-preview__section' }, [
            h(
              'div',
              {
                className: [
                  'cms-preview__hero',
                  `cms-preview__hero--${heroVariant}`,
                  `cms-preview__hero--media-${mediaPosition}`
                ].join(' ')
              },
              [
                h('div', { className: 'cms-preview__hero-copy' }, [
                  h('p', { className: 'cms-preview__eyebrow' }, getValue(entry, ['hero', 'eyebrow'])),
                  h('h1', {}, getValue(entry, ['hero', 'title'], 'Home page title')),
                  h('p', {}, getValue(entry, ['hero', 'intro'])),
                  h('div', { className: 'cms-preview__button-row' }, [
                    button(getValue(entry, ['hero', 'primaryLabel'], 'Primary action')),
                    button(getValue(entry, ['hero', 'secondaryLabel']), true)
                  ])
                ]),
                showPanel
                  ? h('div', { className: 'cms-preview__panel' }, [
                      heroVariant === 'service-led'
                        ? h('p', { className: 'cms-preview__eyebrow' }, getValue(entry, ['hero', 'mediaLabel'], 'Highlights'))
                        : h('div', { className: 'cms-preview__placeholder' }),
                      h('h3', {}, getValue(entry, ['hero', 'mediaTitle'], 'Media panel')),
                      heroVariant === 'service-led'
                        ? h(
                            'ul',
                            { className: 'cms-preview__list' },
                            highlights.map((item) => h('li', {}, item))
                          )
                        : h('p', {}, getValue(entry, ['hero', 'mediaText']))
                    ])
                  : null
              ]
            )
          ]),
          h('section', { className: 'cms-preview__section cms-preview__surface' }, [
            h('h2', {}, 'Homepage layout settings'),
            h('div', { className: 'cms-preview__meta-grid' }, [
              h('div', { className: 'cms-preview__meta' }, [
                h('span', {}, 'Services'),
                h('strong', {}, getValue(entry, ['servicesVariant'], 'grid'))
              ]),
              h('div', { className: 'cms-preview__meta' }, [
                h('span', {}, 'Testimonials'),
                h('strong', {}, getValue(entry, ['testimonialsVariant'], 'grid'))
              ]),
              h('div', { className: 'cms-preview__meta' }, [
                h('span', {}, 'Gallery'),
                h('strong', {}, getValue(entry, ['galleryVariant'], 'grid'))
              ]),
              h('div', { className: 'cms-preview__meta' }, [
                h('span', {}, 'CTA'),
                h('strong', {}, getValue(entry, ['ctaVariant'], 'band'))
              ])
            ])
          ])
        ]);
      }
    });

    const MarkdownPreview = createClass({
      render() {
        const entry = this.props.entry;
        return h('article', { className: 'cms-preview cms-preview__article' }, [
          h('p', { className: 'cms-preview__eyebrow' }, getValue(entry, ['author'], 'Content')),
          h('h1', {}, getValue(entry, ['title'], 'Untitled')),
          h('p', {}, getValue(entry, ['summary'])),
          h('div', { className: 'cms-preview__article-body' }, this.props.widgetFor('body'))
        ]);
      }
    });

    const TestimonialPreview = createClass({
      render() {
        const entry = this.props.entry;
        return h('main', { className: 'cms-preview cms-preview__section' }, [
          h('figure', { className: 'cms-preview__quote' }, [
            h('blockquote', {}, getValue(entry, ['quote'], 'Client quote')),
            h('figcaption', {}, [
              h('strong', {}, getValue(entry, ['name'], 'Client name')),
              h('p', {}, getValue(entry, ['role']))
            ])
          ])
        ]);
      }
    });

    const FAQPreview = createClass({
      render() {
        const entry = this.props.entry;
        return h('main', { className: 'cms-preview cms-preview__section' }, [
          h('p', { className: 'cms-preview__eyebrow' }, 'FAQ'),
          h('h2', {}, getValue(entry, ['question'], 'Question')),
          h('p', {}, getValue(entry, ['answer']))
        ]);
      }
    });

    const SettingsPreview = createClass({
      render() {
        const entry = this.props.entry;
        return h('main', { className: 'cms-preview cms-preview__section' }, [
          h('p', { className: 'cms-preview__eyebrow' }, 'Site settings'),
          h('h1', {}, getValue(entry, ['name'], 'Site name')),
          h('p', {}, getValue(entry, ['description'])),
          h('div', { className: 'cms-preview__meta-grid' }, [
            h('div', { className: 'cms-preview__meta' }, [h('span', {}, 'URL'), h('strong', {}, getValue(entry, ['url']))]),
            h('div', { className: 'cms-preview__meta' }, [h('span', {}, 'Email'), h('strong', {}, getValue(entry, ['email']))]),
            h('div', { className: 'cms-preview__meta' }, [h('span', {}, 'Phone'), h('strong', {}, getValue(entry, ['phone']))]),
            h('div', { className: 'cms-preview__meta' }, [h('span', {}, 'CTA'), h('strong', {}, text(getValue(entry, ['ctaLabel']), 'Not set'))])
          ])
        ]);
      }
    });

    const EmbedPreview = createClass({
      render() {
        const entry = this.props.entry;
        return h('main', { className: 'cms-preview cms-preview__section' }, [
          h('p', { className: 'cms-preview__eyebrow' }, getValue(entry, ['provider'], 'Embed')),
          h('h2', {}, getValue(entry, ['title'], 'Embed title')),
          h('p', {}, getValue(entry, ['intro'])),
          h('pre', { className: 'cms-preview__embed' }, getValue(entry, ['embedCode'], 'Paste trusted embed code.'))
        ]);
      }
    });

    CMS.registerPreviewTemplate('home', HomePreview);
    CMS.registerPreviewTemplate('services', MarkdownPreview);
    CMS.registerPreviewTemplate('posts', MarkdownPreview);
    CMS.registerPreviewTemplate('testimonials', TestimonialPreview);
    CMS.registerPreviewTemplate('faqs', FAQPreview);
    CMS.registerPreviewTemplate('site', SettingsPreview);
    CMS.registerPreviewTemplate('embeds', EmbedPreview);

    CMS.init();
  };

  install();
})();
