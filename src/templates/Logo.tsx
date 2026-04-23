import { AppConfig } from '@/utils/AppConfig';

export const Logo = (props: { isTextHidden?: boolean }) => (
  <div className="flex items-center gap-2 text-xl font-semibold tracking-tight">
    <span className="grid size-8 place-items-center rounded-md bg-gradient-to-br from-emerald-400 to-teal-600 font-black text-black">
      S
    </span>
    {!props.isTextHidden && <span>{AppConfig.name}</span>}
  </div>
);
