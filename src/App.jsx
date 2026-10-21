import { useEffect, useState } from 'react';

const email = 'sam684751@gmail.com';

const projects = [
  {
    name: 'Parking System',
    icon: '⌖',
    href: 'https://github.com/Kidusdybala/Parking-System',
    description: 'A parking management application for registration, account top-ups, parking activity, and history, with an admin approval flow.',
    tags: ['Laravel', 'JavaScript', 'MySQL'],
  },
  {
    name: 'Smart Campus',
    icon: '⌂',
    href: 'https://github.com/Kidusdybala/Smart_campus',
    description: 'A campus digitalization project focused on bringing everyday campus services and workflows online.',
    tags: ['TypeScript', 'Web application'],
  },
  {
    name: 'YegnaChat',
    icon: '✳',
    href: 'https://github.com/Kidusdybala/YegnaChat',
    description: 'A real-time messaging application project built with Ethiopian users and conversations in mind.',
    tags: ['JavaScript', 'Real-time'],
  },
  {
    name: 'City Issue Tracker',
    icon: '◎',
    href: 'https://github.com/Kidusdybala/City-IssueTracker',
    description: 'A place to report local issues and follow their progress toward resolution.',
    tags: ['JavaScript', 'Civic tech'],
  },
  {
    name: '433sport Spam Filter',
    icon: '⌁',
    href: 'https://github.com/Kidusdybala/433sport-spam-filter-bot',
    description: 'A Telegram bot project designed to identify and filter unwanted spam messages.',
    tags: ['Python', 'Telegram bot'],
  },
  {
    name: 'Travel Agency Bot',
    icon: '↗',
    href: 'https://github.com/Kidusdybala/Visa-and-Travel-agency-telegram-bot',
    description: 'A Telegram bot for a travel agency, bringing useful service information into a familiar chat experience.',
    tags: ['Telegram', 'Web'],
  },
];

const socials = [
  ['GitHub', 'https://github.com/Kidusdybala'],
  ['LinkedIn', 'https://www.linkedin.com/in/kidusadugna/'],
  ['Instagram', 'https://www.instagram.com/kidus_adugna'],
];

function ExternalLink({ href, children, className, ...props }) {
  return <a href={href} className={className} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
}

function SectionHeading({ eyebrow, title, children }) {
  return <div className="section-head"><div><div className="mono">{eyebrow}</div><h2>{title}</h2></div>{children && <p>{children}</p>}</div>;
}

function ProjectCard({ project }) {
  return (
    <ExternalLink href={project.href} className="project">
      <div className="project-top"><span className="project-icon" aria-hidden="true">{project.icon}</span><span className="project-arrow" aria-hidden="true">↗</span></div>
      <h3>{project.name}</h3><p>{project.description}</p>
      <div className="tags">{project.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div>
    </ExternalLink>
  );
}

function App() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('portfolio-theme') || 'dark'; } catch { return 'dark'; }
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [stats, setStats] = useState({ repos: '—', followers: '—' });
  const [activeSection, setActiveSection] = useState('');
  const [toast, setToast] = useState('');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'light' ? '#f6f8f4' : '#101412');
    try { localStorage.setItem('portfolio-theme', theme); } catch { /* Theme still works for this visit. */ }
  }, [theme]);

  useEffect(() => {
    const controller = new AbortController();
    fetch('https://api.github.com/users/Kidusdybala', { headers: { Accept: 'application/vnd.github+json' }, signal: controller.signal })
      .then(response => { if (!response.ok) throw new Error('GitHub profile unavailable'); return response.json(); })
      .then(profile => setStats({ repos: profile.public_repos ?? '↗', followers: profile.followers ?? '↗' }))
      .catch(error => { if (error.name !== 'AbortError') setStats({ repos: '↗', followers: '↗' }); });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const sections = [...document.querySelectorAll('main section[id]')];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActiveSection(entry.target.id); });
    }, { rootMargin: '-30% 0px -60% 0px' });
    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!toast) return undefined;
    const timeout = window.setTimeout(() => setToast(''), 2200);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setToast('Email address copied');
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="header"><div className="wrap nav">
        <a className="brand" href="#home" aria-label="Kidus Adugna home"><span className="mark">KA</span><span>Kidus Adugna</span></a>
        <nav className={`navlinks${menuOpen ? ' open' : ''}`} aria-label="Main navigation">
          {[['work', 'Work'], ['about', 'About'], ['github', 'GitHub'], ['contact', 'Contact']].map(([id, label]) => <a key={id} className={activeSection === id ? 'active' : ''} href={`#${id}`} onClick={closeMenu}>{label}</a>)}
        </nav>
        <div className="navtools">
          <button className="icon-btn" type="button" onClick={() => setTheme(value => value === 'light' ? 'dark' : 'light')} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`} title="Toggle color theme"><span aria-hidden="true">{theme === 'light' ? '☾' : '☼'}</span></button>
          <button className="icon-btn menu-btn" type="button" onClick={() => setMenuOpen(value => !value)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen}><span aria-hidden="true">{menuOpen ? '×' : '☰'}</span></button>
        </div>
      </div></header>

      <main id="home">
        <section className="hero"><div className="wrap hero-inner">
          <div className="eyebrow"><span className="pulse" />Information Systems student · Full Stack Developer</div>
          <h1>I build useful things<br />for the <span>web.</span></h1>
          <p className="hero-copy">I’m Kidus, a developer who enjoys turning real problems into clear, reliable digital products. I work across the stack with JavaScript, React, Node.js, PHP, and Laravel.</p>
          <div className="actions"><a className="btn primary" href="#work">Explore my work <span aria-hidden="true">↘</span></a><a className="btn" href={`mailto:${email}`}>Get in touch <span aria-hidden="true">↗</span></a></div>
          <div className="hero-meta"><span><i className="pulse" aria-hidden="true" /><b>Information Systems student</b></span><span>Full stack development</span><span>Building with purpose</span></div>
        </div></section>

        <section className="content" id="work"><div className="wrap">
          <SectionHeading eyebrow="Selected projects" title="Things I’ve built.">A few projects exploring practical tools, communication, and better digital experiences.</SectionHeading>
          <div className="projects">{projects.map(project => <ProjectCard key={project.name} project={project} />)}</div>
        </div></section>

        <section className="content" id="about"><div className="wrap">
          <SectionHeading eyebrow="A little about me" title="Curious by nature." />
          <div className="about-grid"><div className="about-copy">
            <p>I’m an <strong>Information Systems student</strong> and full stack developer interested in how technology can make day-to-day work simpler. I like understanding the problem first, then shaping a solution that feels straightforward to use.</p>
            <p>My projects have taken me from backend workflows and database-backed applications to real-time messaging and chat bots. I’m always learning, iterating, and looking for good people to build with.</p>
            <ExternalLink className="btn" href="https://www.linkedin.com/in/kidusadugna/">Connect on LinkedIn <span aria-hidden="true">↗</span></ExternalLink>
          </div><div className="stack">
            <div className="stack-card"><b>Frontend</b><span>JavaScript · TypeScript · React · HTML · CSS</span></div>
            <div className="stack-card"><b>Backend</b><span>Node.js · PHP · Laravel · Python</span></div>
            <div className="stack-card"><b>Data &amp; tools</b><span>MongoDB · MySQL · Git · REST APIs</span></div>
          </div></div>
        </div></section>

        <section className="content" id="github"><div className="wrap">
          <SectionHeading eyebrow="More on GitHub" title="Open work, in progress."><ExternalLink className="btn" href="https://github.com/Kidusdybala">Visit my GitHub <span aria-hidden="true">↗</span></ExternalLink></SectionHeading>
          <div className="github-card"><div><h3>Kidus Adugna <span className="mono" style={{ textTransform: 'none', letterSpacing: 0 }}>@Kidusdybala</span></h3><p>Follow along with what I’m learning and building.</p></div><div className="stats" aria-live="polite"><div className="stat"><b>{stats.repos}</b><span>Repositories</span></div><div className="stat"><b>{stats.followers}</b><span>Followers</span></div></div></div>
        </div></section>

        <section className="content" id="contact"><div className="wrap"><div className="contact">
          <div><div className="mono">Have a project in mind?</div><h2>Let’s make it happen.</h2><p>I’m always glad to hear about interesting ideas and opportunities.</p></div>
          <div className="contact-actions"><a className="btn primary" href={`mailto:${email}`}>Email me <span aria-hidden="true">↗</span></a><button className="btn" type="button" onClick={copyEmail}>Copy email</button></div>
        </div></div></section>
      </main>

      <footer className="wrap footer"><span>© {new Date().getFullYear()} Kidus Adugna</span><span>Designed &amp; built with care.</span><span>{socials.map(([label, href], index) => <span key={label}><ExternalLink href={href}>{label}</ExternalLink>{index < socials.length - 1 ? ' · ' : ''}</span>)}</span></footer>
      <div className={`toast${toast ? ' show' : ''}`} role="status" aria-live="polite">{toast}</div>
    </>
  );
}

export default App;
