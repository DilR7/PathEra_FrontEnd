const LoadingIcon = ({ color = "#0EA5E9" }: { color?: string }) => {
  const rectSize = 60;
  const spacing = 30;
  const viewBoxWidth = 3 * rectSize + 2 * spacing;
  const viewBoxHeight = 2 * rectSize;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      width="200"
      height="150"
    >
      <rect
        fill={color}
        stroke={color}
        strokeWidth="10"
        width={rectSize}
        height={rectSize}
        x="0"
        y="20"
      >
        <animate
          attributeName="y"
          calcMode="spline"
          dur="2s"
          values="20;70;20;"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          begin="-.4s"
        ></animate>
      </rect>
      <rect
        fill={color}
        stroke={color}
        strokeWidth="10"
        width={rectSize}
        height={rectSize}
        x={rectSize + spacing}
        y="20"
      >
        <animate
          attributeName="y"
          calcMode="spline"
          dur="2s"
          values="20;70;20;"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          begin="-.2s"
        ></animate>
      </rect>
      <rect
        fill={color}
        stroke={color}
        strokeWidth="10"
        width={rectSize}
        height={rectSize}
        x={2 * (rectSize + spacing)}
        y="20"
      >
        <animate
          attributeName="y"
          calcMode="spline"
          dur="2s"
          values="20;70;20;"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          begin="0s"
        ></animate>
      </rect>
    </svg>
  );
};

export default LoadingIcon;
