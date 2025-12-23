'use client';

import React from 'react';

const MetricCard = ({ label, value, trend }: { label: string; value: string; trend?: 'up' | 'down' | 'stable' }) => (
  <div className="flex flex-col items-center gap-1">
    <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
      {label}
    </span>

    <span className="text-2xl font-bold text-primary-foreground dark:text-primary">
      {value}
    </span>

    {trend && (
      <span
        className={
          trend === 'up'
            ? 'text-green-500'
            : trend === 'down'
              ? 'text-red-500'
              : 'text-muted-foreground'
        }
      >
        {trend === 'up' ? '▲' : trend === 'down' ? '▼' : '–'}
      </span>
    )}
  </div>
);

const SectionCard = ({ title, children }: React.PropsWithChildren<{ title: string }>) => (
  <section className="rounded-lg border p-6 shadow-sm dark:border-gray-700">
    <h2 className="mb-4 text-lg font-semibold uppercase tracking-wide text-muted-foreground">
      {title}
    </h2>
    {children}
  </section>
);

const DashboardIndexPage = () => (
  <div className="mx-auto max-w-5xl space-y-12 p-4 md:p-8">
    {/* TOPO — ESTADO DO NEGÓCIO */}
    <section className="flex flex-col items-center gap-6 text-center">
      <h1 className="text-3xl font-bold uppercase tracking-wide">
        Estado do Negócio
      </h1>

      {/* Main score */}
      <span className="text-6xl font-extrabold text-primary">85%</span>

      {/* Critical variations */}
      <div className="flex flex-wrap justify-center gap-8">
        <MetricCard label="Visibilidade" value="72%" trend="up" />
        <MetricCard label="Reputação" value="4.4" trend="down" />
        <MetricCard label="Conversão" value="27%" trend="stable" />
      </div>
    </section>

    {/* BLOCO 1 — VISIBILIDADE */}
    <SectionCard title="Visibilidade">
      <p className="mb-4 text-sm text-muted-foreground">
        Como estão me encontrando
      </p>

      {/* Placeholder for chart / analytics */}
      <div className="h-48 w-full rounded-md bg-muted" />

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-md bg-muted p-4 text-center">Busca vs Maps</div>
        <div className="rounded-md bg-muted p-4 text-center">Termos principais</div>
        <div className="rounded-md bg-muted p-4 text-center">Horários de pico</div>
      </div>
    </SectionCard>

    {/* BLOCO 2 — REPUTAÇÃO */}
    <SectionCard title="Reputação">
      <p className="mb-4 text-sm text-muted-foreground">O que falam de mim</p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-md bg-muted p-4 text-center">Nota média</div>
        <div className="rounded-md bg-muted p-4 text-center">Tendência emocional</div>
        <div className="rounded-md bg-muted p-4 text-center">Risco</div>
      </div>

      <div className="mt-6 rounded-md bg-muted p-4 text-center">
        Reviews recentes / Sentimento / Alertas críticos
      </div>
    </SectionCard>

    {/* BLOCO 3 — CONVERSÃO */}
    <SectionCard title="Conversão">
      <p className="mb-4 text-sm text-muted-foreground">
        O que virou ação
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="rounded-md bg-muted p-4 text-center">Cliques para ligar</div>
        <div className="rounded-md bg-muted p-4 text-center">Rotas</div>
        <div className="rounded-md bg-muted p-4 text-center">Site</div>
        <div className="rounded-md bg-muted p-4 text-center">CTA</div>
      </div>
    </SectionCard>
  </div>
);

export default DashboardIndexPage;
