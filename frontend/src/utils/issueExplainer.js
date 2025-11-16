// Comprehensive guide for explaining accessibility and SEO issues

export const issueGuide = {
  // Accessibility Issues
  'missing-alt': {
    title: 'Missing Alt Text',
    explanation: 'Images must have "alt" text to describe what they show. This helps blind users understand the image content through screen readers.',
    why: 'Screen reader users cannot see images, so alt text is their only way to know what the image represents.',
    howToFix: 'Add an alt attribute to every <img> tag with a clear description: <img src="logo.png" alt="Company logo">',
    example: '❌ Wrong: <img src="photo.jpg">\n✅ Right: <img src="photo.jpg" alt="Team members smiling in office">',
    wcagLevel: 'Level A - Critical'
  },

  'missing-lang': {
    title: 'Missing Language Attribute',
    explanation: 'The <html> tag should have a "lang" attribute to specify the page language.',
    why: 'Screen readers use this to read text with correct pronunciation. For example, French text needs French pronunciation.',
    howToFix: 'Add lang attribute to <html> tag: <html lang="en"> for English, <html lang="fr"> for French',
    example: '❌ Wrong: <html>\n✅ Right: <html lang="en">',
    wcagLevel: 'Level A - Critical'
  },

  'missing-h1': {
    title: 'Missing H1 Heading',
    explanation: 'Every page should have exactly one H1 heading that describes the main topic of the page.',
    why: 'H1 helps screen reader users understand the page structure and main topic. It\'s like the title of a document.',
    howToFix: 'Add <h1> tag with your page\'s main topic: <h1>Welcome to Our Store</h1>',
    example: '❌ Wrong: <h2>Welcome</h2>\n✅ Right: <h1>Welcome to Our Store</h1>',
    wcagLevel: 'Level A - Critical'
  },

  'multiple-h1': {
    title: 'Multiple H1 Headings',
    explanation: 'A page should have only ONE H1 heading, not multiple.',
    why: 'Multiple H1s confuse screen readers and search engines about what the page is really about.',
    howToFix: 'Keep only one H1 per page. Change extra H1s to H2, H3, etc.: <h2>Subheading</h2>',
    example: '❌ Wrong: <h1>Title</h1> ... <h1>Another Title</h1>\n✅ Right: <h1>Title</h1> ... <h2>Subtitle</h2>',
    wcagLevel: 'Level A - Major'
  },

  'heading-hierarchy': {
    title: 'Heading Hierarchy Issue',
    explanation: 'Headings should go in order: H1 → H2 → H3. Don\'t skip levels.',
    why: 'Proper hierarchy helps screen readers and users understand the page structure and relationships.',
    howToFix: 'Use headings in sequence: H1 (main), H2 (sections), H3 (subsections), etc. Don\'t jump from H1 to H3.',
    example: '❌ Wrong: <h1>Title</h1> <h3>Subsection</h3>\n✅ Right: <h1>Title</h1> <h2>Section</h2> <h3>Subsection</h3>',
    wcagLevel: 'Level A - Major'
  },

  'form-missing-label': {
    title: 'Form Input Missing Label',
    explanation: 'Every form input (textbox, dropdown, etc.) needs a label that describes what it is.',
    why: 'Screen reader users need to know what each form field is for. Labels also help mobile users.',
    howToFix: 'Add <label for="fieldId">Label Text</label> before your input: <label for="email">Email:</label> <input id="email" type="text">',
    example: '❌ Wrong: <input id="email" type="text">\n✅ Right: <label for="email">Email:</label> <input id="email" type="text">',
    wcagLevel: 'Level A - Critical'
  },

  'link-empty-text': {
    title: 'Link with No Text',
    explanation: 'Links must have descriptive text inside them. Screen readers read this text aloud.',
    why: 'Screen reader users need to know where each link goes. Empty links are confusing.',
    howToFix: 'Add descriptive text inside <a> tags: <a href="/about">Read about us</a>',
    example: '❌ Wrong: <a href="/about">Link</a>\n✅ Right: <a href="/about">Read about our company</a>',
    wcagLevel: 'Level A - Critical'
  },

  'link-generic-text': {
    title: 'Generic Link Text',
    explanation: 'Avoid generic link text like "Click here", "Read more", "More". Use descriptive text instead.',
    why: 'When screen reader users hear "Click here", they don\'t know what they\'re clicking. "Read about our team" is better.',
    howToFix: 'Replace generic text with specific descriptions: <a href="/team">Read about our team</a>',
    example: '❌ Wrong: <a href="/about">Read more</a>\n✅ Right: <a href="/team">Learn about our team members</a>',
    wcagLevel: 'Level A - Major'
  },

  'color-contrast-issue': {
    title: 'Color Contrast Problem',
    explanation: 'Text color must have enough contrast with background color. Insufficient contrast makes text hard to read.',
    why: 'People with low vision, color blindness, or those reading on bright screens need high contrast to read.',
    howToFix: 'Use a contrast checker tool (WebAIM) to ensure text is dark enough on light backgrounds or vice versa.',
    example: '❌ Wrong: Light gray text on white background\n✅ Right: Dark text on white background',
    wcagLevel: 'Level AA - Major'
  },

  // SEO Issues
  'missing-title': {
    title: 'Missing Title Tag',
    explanation: 'The <title> tag should be in the <head> section. It\'s shown in browser tabs and search results.',
    why: 'Search engines use title tags to understand page content. It\'s the first thing users see in search results.',
    howToFix: 'Add in <head>: <title>Page Title - Website Name</title>',
    example: '❌ Wrong: (no title tag)\n✅ Right: <title>Best Running Shoes - Athletic Store</title>',
    wcagLevel: 'Level A - Critical'
  },

  'short-title': {
    title: 'Title Too Short',
    explanation: 'Title tags should be 30-60 characters long for best results.',
    why: 'Short titles don\'t give enough information to users or search engines. Too long titles get cut off in search results.',
    howToFix: 'Expand your title to 30-60 characters: <title>Best Running Shoes Online | Athletic Store</title>',
    example: '❌ Wrong: <title>Shoes</title> (5 chars)\n✅ Right: <title>Best Running Shoes Online | Athletic Store</title> (52 chars)',
    wcagLevel: 'Level A - Major'
  },

  'long-title': {
    title: 'Title Too Long',
    explanation: 'Title tags should be 30-60 characters. Longer titles get cut off in search results.',
    why: 'Search engines display only 50-60 characters in search results. Longer titles waste space.',
    howToFix: 'Shorten your title to 30-60 characters by removing unnecessary words.',
    example: '❌ Wrong: <title>Buy the Best Quality Running Shoes Online at Great Prices from Our Athletic Store</title>\n✅ Right: <title>Best Running Shoes Online | Athletic Store</title>',
    wcagLevel: 'Level A - Major'
  },

  'missing-meta-desc': {
    title: 'Missing Meta Description',
    explanation: 'The meta description tag summarizes page content in 120-160 characters.',
    why: 'Search engines display this description under your title in search results. It helps users decide to click.',
    howToFix: 'Add in <head>: <meta name="description" content="Discover our collection of premium running shoes with free shipping.">',
    example: '❌ Wrong: (no meta description)\n✅ Right: <meta name="description" content="Shop premium running shoes with expert reviews and free shipping.">',
    wcagLevel: 'Level A - Critical'
  },

  'short-meta-desc': {
    title: 'Meta Description Too Short',
    explanation: 'Meta descriptions should be 120-160 characters for best results.',
    why: 'Too short descriptions don\'t give enough information to users deciding whether to click.',
    howToFix: 'Expand your description to 120-160 characters with more details about the page.',
    example: '❌ Wrong: <meta name="description" content="Shoes">\n✅ Right: <meta name="description" content="Shop premium running shoes with free shipping and expert reviews. Find the perfect fit for your athletic needs.">',
    wcagLevel: 'Level A - Major'
  },

  'long-meta-desc': {
    title: 'Meta Description Too Long',
    explanation: 'Meta descriptions should be 120-160 characters. Longer ones get cut off in search results.',
    why: 'Search engines display only 120-160 characters. Longer descriptions waste space and confuse users.',
    howToFix: 'Shorten to 120-160 characters by keeping only the most important information.',
    example: '❌ Wrong: Very long description (over 160 chars)\n✅ Right: "Shop premium running shoes with free shipping and expert reviews. Perfect for athletes."',
    wcagLevel: 'Level A - Major'
  },

  'missing-viewport': {
    title: 'Missing Viewport Meta Tag',
    explanation: 'The viewport tag tells mobile browsers how to display your page.',
    why: 'Without it, mobile sites look broken. Google also ranks mobile-friendly sites higher.',
    howToFix: 'Add in <head>: <meta name="viewport" content="width=device-width, initial-scale=1.0">',
    example: '❌ Wrong: (no viewport tag)\n✅ Right: <meta name="viewport" content="width=device-width, initial-scale=1.0">',
    wcagLevel: 'Level A - Critical'
  },

  'missing-canonical': {
    title: 'Missing Canonical Tag',
    explanation: 'Canonical tags tell search engines which version of a page is the "main" one.',
    why: 'Without it, search engines might index duplicate pages, hurting your SEO ranking.',
    howToFix: 'Add in <head>: <link rel="canonical" href="https://yoursite.com/page">',
    example: '❌ Wrong: (no canonical tag)\n✅ Right: <link rel="canonical" href="https://example.com/about">',
    wcagLevel: 'Level A - Major'
  },

  'missing-og-tags': {
    title: 'Missing Open Graph Tags',
    explanation: 'Open Graph tags control how your page appears on social media (Facebook, Twitter, etc.).',
    why: 'Social media sites use these tags to show a nice preview with title, description, and image when shared.',
    howToFix: 'Add in <head>:\n<meta property="og:title" content="Page Title">\n<meta property="og:description" content="Page description">\n<meta property="og:image" content="image.jpg">',
    example: '❌ Wrong: (no og tags)\n✅ Right: Has og:title, og:description, og:image tags',
    wcagLevel: 'Level A - Minor'
  },

  'images-missing-alt': {
    title: 'Images Missing Alt Text',
    explanation: 'Multiple images don\'t have alt text descriptions.',
    why: 'Search engines use alt text to understand images. Also needed for screen readers.',
    howToFix: 'Add alt attribute to all <img> tags with descriptive text.',
    example: '❌ Wrong: <img src="pic.jpg">\n✅ Right: <img src="pic.jpg" alt="Person hiking in mountains">',
    wcagLevel: 'Level A - Major'
  }
};

export const getIssueHelp = (issueId) => {
  return issueGuide[issueId] || {
    title: 'Issue Information',
    explanation: 'No detailed guide available for this issue.',
    why: 'Contact support for more information.',
    howToFix: 'See the issue description and location for guidance.',
    example: '',
    wcagLevel: 'Unknown'
  };
};
