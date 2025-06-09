import {useInView} from "react-intersection-observer";

export const useFadeIn = (options = {triggerOnce: true, threshold: 0.1}) => {
  const [ref, inView] = useInView(options);

  const fadeInVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      filter: "blur(2px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const animationProps = {
    initial: "hidden",
    animate: inView ? "visible" : "hidden",
    variants: fadeInVariants,
  };

  return {ref, animationProps};
};
