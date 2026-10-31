export default function PageHeading({eyebrow,title,description}:{eyebrow:string;title:string;description:string}) {
  return <div className="mb-8"><div className="mb-2 text-[11px] font-bold uppercase tracking-[.18em] text-[#9a7841]">{eyebrow}</div><h1 className="text-3xl font-bold tracking-tight text-[#183b2e] md:text-[38px]">{title}</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-[#718077] md:text-base">{description}</p></div>
}
