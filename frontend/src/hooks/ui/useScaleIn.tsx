import {useInView} from "react-intersection-observer";

export const useScaleIn = (options = {triggerOnce: true, threshold: 0.3}) => {
  const [ref, inView] = useInView(options);

  const blurScaleInVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      filter: "blur(1px)",
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const animationProps = {
    initial: "hidden",
    animate: inView ? "visible" : "hidden",
    variants: blurScaleInVariants,
  };

  return {ref, animationProps};
};
