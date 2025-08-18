'use client';
import { useEffect, useState } from 'react';

import { TitleBar } from '@/features/dashboard/TitleBar';

type Accounts = { twitter: string; facebook: string; wordpress: string };

const ConnectionsPage = () => {
  const [accounts, setAccounts] = useState<Accounts>({ twitter: '', facebook: '', wordpress: '' });

  useEffect(() => {
    const stored = localStorage.getItem('connections');
    if (stored) {
      setAccounts(JSON.parse(stored));
    }
  }, []);

  const update = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccounts({ ...accounts, [e.target.name]: e.target.value });
  };

  const save = () => {
    localStorage.setItem('connections', JSON.stringify(accounts));
  };

  return (
    <>
      <TitleBar title="Connections" description="Link your social and WordPress accounts" />
      <div className="max-w-md space-y-4">
        <input
          className="w-full rounded border p-2"
          name="twitter"
          placeholder="Twitter handle"
          value={accounts.twitter}
          onChange={update}
        />
        <input
          className="w-full rounded border p-2"
          name="facebook"
          placeholder="Facebook profile"
          value={accounts.facebook}
          onChange={update}
        />
        <input
          className="w-full rounded border p-2"
          name="wordpress"
          placeholder="WordPress URL"
          value={accounts.wordpress}
          onChange={update}
        />
        <button
          type="button"
          className="rounded bg-primary px-4 py-2 text-primary-foreground"
          onClick={save}
        >
          Save
        </button>
      </div>
    </>
  );
};

export default ConnectionsPage;
