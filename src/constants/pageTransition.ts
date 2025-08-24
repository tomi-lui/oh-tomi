export const pageTransition = () => {
  document.documentElement.animate(
    [
      {
        transform: "translateY(0) scale(1)",
        opacity: 1,
      },
      {
        transform: "translateY(-100px) scale(0.95)",
        opacity: 0.7,
      },
    ],
    {
      duration: 1000,
      easing: "cubic-bezier(0.87, 0, 0.13, 1)",
      fill: "forwards",
      pseudoElement: "::view-transition-old(root)",
    }
  );

  document.documentElement.animate(
    [
      {
        transform: "translateY(120%) scale(0.9)",
        opacity: 0,
      },
      {
        transform: "translateY(0) scale(1)",
        opacity: 1,
      },
    ],
    {
      duration: 1000,
      easing: "cubic-bezier(0.87, 0, 0.13, 1)",
      fill: "forwards",
      pseudoElement: "::view-transition-new(root)",
    }
  );
};
