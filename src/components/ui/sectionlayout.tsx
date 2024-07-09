const SectionLayout = (props: {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  style?: React.CSSProperties;
}) => {
  return (
    <>
      <section
        className={`flex justify-center ${props.className}`}
        style={props.style}
      >
        <div
          className={`2xl:max-w-9xl 3xl:max-w-11xl w-full px-6 sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-[75rem] ${
            props.innerClassName
          }`}
        >
          {props.children}
        </div>
      </section>
    </>
  );
};

export default SectionLayout;
