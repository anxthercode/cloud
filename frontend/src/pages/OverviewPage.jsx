import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Topbar from '../components/Topbar';

export default function OverviewPage() {
  const { getMyVMs, tenants, role } = useApp();
  const navigate = useNavigate();
  const vms = getMyVMs();
  const tenant = tenants[0];

  const stats = useMemo(() => {
    const running = vms.filter((v) => v.status === 'active').length;
    return { total: vms.length, running, stopped: vms.length - running };
  }, [vms]);

  const quota = tenant?.quota;
  const usage = tenant?.usage;

  return (
    <div>
      <Topbar title="Обзор" />
      <div className="page-content">
        <div className="stats-grid" style={{ marginBottom: 24 }}>
          <div className="stat-card stat-blue">
            <div className="stat-icon-text">VM</div>
            <div className="stat-label">Инстансы</div>
            <div className="stat-value">{stats.total}</div>
            <div className="stat-sub">{stats.running} запущено</div>
          </div>
          <div className="stat-card stat-green">
            <div className="stat-icon-text">▶</div>
            <div className="stat-label">Активные</div>
            <div className="stat-value">{stats.running}</div>
            <div className="stat-sub">в сети</div>
          </div>
          <div className="stat-card stat-yellow">
            <div className="stat-icon-text">◇</div>
            <div className="stat-label">Остановлены</div>
            <div className="stat-value">{stats.stopped}</div>
            <div className="stat-sub">выключены</div>
          </div>
          <div className="stat-card stat-red">
            <div className="stat-icon-text">◎</div>
            <div className="stat-label">Роль</div>
            <div className="stat-value" style={{ fontSize: 22 }}>
              {role === 'tenant-admin' ? 'Админ' : 'Участник'}
            </div>
            <div className="stat-sub">workspace</div>
          </div>
        </div>

        <div className="grid-2">
          <div className="card">
            <div className="card-header">
              <div className="card-title">Быстрые действия</div>
            </div>
            <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <button type="button" className="btn btn-primary" onClick={() => navigate('/instances/create')}>
                Создать инстанс
              </button>
              <button type="button" className="btn btn-ghost" onClick={() => navigate('/instances')}>
                Все инстансы
              </button>
              <button type="button" className="btn btn-ghost" onClick={() => navigate('/networking')}>
                Сеть
              </button>
              <button type="button" className="btn btn-ghost" onClick={() => navigate('/usage')}>
                Использование и лимиты
              </button>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <div className="card-title">Лимиты workspace</div>
            </div>
            <div className="card-body">
              {quota && usage ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontSize: 14 }}>
                  <div className="flex-row" style={{ justifyContent: 'space-between' }}>
                    <span className="text-muted">Инстансы</span>
                    <span className="font-mono">
                      {usage.vm} / {quota.vm}
                    </span>
                  </div>
                  <div className="flex-row" style={{ justifyContent: 'space-between' }}>
                    <span className="text-muted">vCPU</span>
                    <span className="font-mono">
                      {usage.cpu} / {quota.cpu}
                    </span>
                  </div>
                  <div className="flex-row" style={{ justifyContent: 'space-between' }}>
                    <span className="text-muted">RAM (GB)</span>
                    <span className="font-mono">
                      {usage.ram} / {quota.ram}
                    </span>
                  </div>
                  <div className="flex-row" style={{ justifyContent: 'space-between' }}>
                    <span className="text-muted">Диск (GB)</span>
                    <span className="font-mono">
                      {usage.disk} / {quota.disk}
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-muted" style={{ margin: 0 }}>
                  Лимиты появятся после загрузки workspace.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
