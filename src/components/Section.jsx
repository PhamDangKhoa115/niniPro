export default function Section({ title, children, right }) {
  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-[980px] px-4 sm:px-6">
        <div className="py-8 sm:py-10">
          <div className="flex items-end justify-between gap-4">
            <h2 className="w-full text-center sm:text-left text-3xl md:text-4xl font-serif font-semibold font-['Times_New_Roman'] tracking-wide text-brandText">
              {title}
            </h2>
            {right}
          </div>
          <div className="mt-4">{children}</div>
        </div>
      </div>
      <div className="h-9 bg-pink-600/70" />
    </section>
  );
}
