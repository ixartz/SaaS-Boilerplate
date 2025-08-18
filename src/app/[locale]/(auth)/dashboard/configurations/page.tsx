'use client';
import { useEffect, useState } from 'react';

import { TitleBar } from '@/features/dashboard/TitleBar';

type Config = { id: string; topic: string; article?: string };

const ConfigurationsPage = () => {
  const [configs, setConfigs] = useState<Config[]>([]);
  const [topic, setTopic] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('configs');
    if (stored) {
      setConfigs(JSON.parse(stored));
    }
  }, []);

  const saveConfigs = (data: Config[]) => {
    setConfigs(data);
    localStorage.setItem('configs', JSON.stringify(data));
  };

  const addConfig = () => {
    if (!topic || configs.length >= 10) {
      return;
    }
    const newConfig = { id: Date.now().toString(), topic };
    saveConfigs([...configs, newConfig]);
    setTopic('');
  };

  const generate = async (config: Config) => {
    if (!localStorage.getItem('paid')) {
      return;
    }
    const accounts = JSON.parse(localStorage.getItem('connections') || '{}');
    const res = await fetch('/api/generate', {
      method: 'POST',
      body: JSON.stringify({ accounts, config }),
    });
    const data = await res.json();
    const updated = configs.map(c =>
      c.id === config.id ? { ...c, article: data.article } : c,
    );
    saveConfigs(updated);
  };

  return (
    <>
      <TitleBar
        title="Configurations"
        description="Save criteria combos and generate articles"
      />
      <div className="max-w-md space-y-4">
        <div className="flex space-x-2">
          <input
            className="flex-1 rounded border p-2"
            placeholder="Topic"
            value={topic}
            onChange={e => setTopic(e.target.value)}
          />
          <button
            type="button"
            className="rounded bg-primary px-4 py-2 text-primary-foreground"
            onClick={addConfig}
          >
            Add
          </button>
        </div>
        {configs.map(cfg => (
          <div key={cfg.id} className="rounded border p-2">
            <div className="flex justify-between">
              <span>{cfg.topic}</span>
              <button
                type="button"
                className="text-sm text-primary"
                onClick={() => generate(cfg)}
              >
                {cfg.article ? 'Regenerate' : 'Generate'}
              </button>
            </div>
            {cfg.article && (
              <p className="mt-2 whitespace-pre-wrap">{cfg.article}</p>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default ConfigurationsPage;
