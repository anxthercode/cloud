import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BrandLogo = ({ size = 40 }) => (
  <svg width={size * 0.76} height={size} viewBox="0 0 37 49" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="33" height="45" rx="10" fill="#E8002D" />
    <path
      d="M11 26C11 21.58 14.58 18 19 18C22.87 18 26 21.13 26 25C26 28.87 22.87 32 19 32H14"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Railway-style pillars: outcomes, not internal entities */
const PILLARS = [
  { k: 'deploy', title: 'Deploy', desc: 'Запускайте инстансы за минуты: образы ОС, пресеты ресурсов, предсказуемый pipeline.' },
  { k: 'net', title: 'Network', desc: 'Сеть и изоляция без лишней магии: понятные сегменты, firewall, IP.' },
  { k: 'scale', title: 'Scale', desc: 'Растите по мере нагрузки: гибкие размеры, контроль использования workspace.' },
  { k: 'observe', title: 'Observe', desc: 'Мониторинг и события в одном месте — видно, что происходит с инфраструктурой.' },
  { k: 'secure', title: 'Secure', desc: 'Аудит действий, роли команды и прозрачность для спокойной эксплуатации.' },
];

const OS_LIST = [
  { icon: '🐧', label: 'Ubuntu' },
  { icon: '🐧', label: 'Debian' },
  { icon: '🪟', label: 'Windows' },
  { icon: '🪨', label: 'Rocky Linux' },
  { icon: '⭐', label: 'Astra Linux' },
];

const STEPS = [
  { num: 1, title: 'Аккаунт', desc: 'Создайте организацию и войдите в консоль — без ручных «заявок» как единственного пути.' },
  { num: 2, title: 'Workspace', desc: 'Получите изолированное пространство: команда, лимиты и политика доступа.' },
  { num: 3, title: 'Инстанс', desc: 'Выберите образ и размер — инстанс поднимается через очередь задач control plane.' },
  { num: 4, title: 'Эксплуатация', desc: 'Управляйте питанием, сетью и наблюдаемостью; автоматизируйте через API.' },
];

const TRUST = [
  { t: 'Изоляция', d: 'Разделение на уровне workspace и проектов.' },
  { t: 'Аудит', d: 'Понятная история действий для команды и комплаенса.' },
  { t: 'Регионы', d: 'Прозрачность по узлам и размещению нагрузки.' },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [showNavButtons, setShowNavButtons] = useState(false);
  const pillarsRef = useRef(null);

  useEffect(() => {
    const el = pillarsRef.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      setShowNavButtons(rect.top <= 72);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className="landing-page landing-page--product">
      <nav className="landing-nav landing-nav--dark">
        <div className="landing-nav-inner">
          <div className="landing-logo">
            <BrandLogo size={36} />
            <span className="landing-logo-text landing-logo-text--dark">Cloud <span>IaaS</span></span>
          </div>
          <div className={`landing-nav-right ${showNavButtons ? 'landing-nav-right-visible' : 'landing-nav-right-hidden'}`}>
            <button type="button" className="landing-btn-login landing-btn-login--dark" onClick={() => navigate('/login')}>Войти</button>
            <button type="button" className="landing-btn-try" onClick={() => navigate('/register')}>Создать аккаунт</button>
          </div>
        </div>
      </nav>

      <section className="landing-hero landing-hero--tight">
        <div className="landing-hero-inner">
          <div>
            <p className="landing-eyebrow">Control plane для вычислений</p>
            <h1 className="landing-hero-title">
              Разворачивайте инфраструктуру
              <br />
              <span className="landing-gradient-text">быстро и предсказуемо</span>
            </h1>
            <p className="landing-hero-sub">
              Единая консоль для инстансов, сети и наблюдаемости. Меньше операционного шума — больше фокуса на продукте.
            </p>
            <ul className="landing-hero-features">
              {['Деплой инстансов за считанные минуты', 'API и UI в одной модели', 'Прозрачное использование ресурсов'].map((f) => (
                <li key={f} className="landing-hero-feature">
                  <span className="landing-hero-feature-icon">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <div className="landing-hero-cta">
              <button type="button" className="landing-cta-btn" onClick={() => navigate('/register')}>Начать</button>
              <button type="button" className="landing-cta-btn-outline" onClick={() => navigate('/login')}>Войти в консоль</button>
            </div>
          </div>
          <div className="landing-hero-panel" aria-hidden>
            <div className="landing-server-graphic">
              <div className="landing-server-title">instances · us-east</div>
              <div className="landing-server-item">
                <span className="landing-server-name">api-prod-01</span>
                <span className="landing-server-status">
                  <span className="landing-server-dot" style={{ background: '#22c55e' }} />
                  <span className="landing-server-spec">running</span>
                </span>
              </div>
              <div className="landing-server-item">
                <span className="landing-server-name">worker-batch</span>
                <span className="landing-server-status">
                  <span className="landing-server-dot" style={{ background: '#38bdf8' }} />
                  <span className="landing-server-spec">creating</span>
                </span>
              </div>
              <div className="landing-server-item">
                <span className="landing-server-name">vpn-edge</span>
                <span className="landing-server-status">
                  <span className="landing-server-dot" style={{ background: '#94a3b8' }} />
                  <span className="landing-server-spec">stopped</span>
                </span>
              </div>
            </div>
            <p className="landing-panel-caption">Демо-блок интерфейса · не реальные данные</p>
          </div>
        </div>
      </section>

      <section className="landing-pillars" ref={pillarsRef}>
        <div className="landing-features-inner">
          <h2 className="landing-features-title landing-features-title--dark">Платформа целиком</h2>
          <p className="landing-section-lead">Пять опорных направлений — как у сильных cloud-продуктов: ясная история без перегруза сущностями.</p>
          <div className="landing-pillars-grid">
            {PILLARS.map((p) => (
              <div key={p.k} className="landing-pillar-card">
                <div className="landing-pillar-k">{p.title}</div>
                <div className="landing-pillar-desc">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-trust">
        <div className="landing-features-inner">
          <h2 className="landing-features-title landing-features-title--dark">Надёжность и прозрачность</h2>
          <div className="landing-trust-grid">
            {TRUST.map((x) => (
              <div key={x.t} className="landing-trust-card">
                <div className="landing-trust-title">{x.t}</div>
                <div className="landing-trust-desc">{x.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-features landing-features--dark">
        <div className="landing-features-inner">
          <h2 className="landing-features-title landing-features-title--dark">Образы ОС</h2>
          <div className="landing-os-grid">
            {OS_LIST.map((os) => (
              <div key={os.label} className="landing-os-card landing-os-card--dark">
                <div style={{ fontSize: 32, marginBottom: 8 }}>{os.icon}</div>
                <div className="landing-os-label landing-os-label--dark">{os.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-api-band">
        <div className="landing-features-inner landing-api-inner">
          <div>
            <h2 className="landing-features-title landing-features-title--dark" style={{ marginBottom: 12 }}>API и автоматизация</h2>
            <p className="landing-section-lead" style={{ marginBottom: 0 }}>
              Та же модель, что в UI: инстансы, задачи, события. Стройте пайплайны и интеграции без «второго» мира абстракций.
            </p>
          </div>
          <pre className="landing-code-snippet">
            <code>{`POST /api/vms/\n  { "name": "edge-1", "flavor": "medium", "os_template": "ubuntu-22.04" }`}</code>
          </pre>
        </div>
      </section>

      <section className="landing-steps landing-steps--dark">
        <div className="landing-steps-inner">
          <h2 className="landing-steps-title landing-steps-title--light">Как начать</h2>
          <p className="landing-steps-sub landing-steps-sub--muted">От аккаунта до первого инстанса — без фокуса на внутренних ролях control plane</p>
          <div className="landing-steps-grid">
            {STEPS.map((s) => (
              <div key={s.num} className="landing-step">
                <div className="landing-step-num">{s.num}</div>
                <div className="landing-step-title landing-step-title--light">{s.title}</div>
                <div className="landing-step-desc landing-step-desc--muted">{s.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <button type="button" className="landing-cta-btn" onClick={() => navigate('/register')}>Создать аккаунт →</button>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <div>© {new Date().getFullYear()} Cloud IaaS</div>
        <div className="landing-footer-links">
          <span>Proxmox VE · Django control plane</span>
        </div>
      </footer>
    </div>
  );
}
