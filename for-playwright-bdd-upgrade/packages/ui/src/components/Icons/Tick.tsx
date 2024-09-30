export default function TickIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M13 24.5C12.6024 24.4983 12.2211 24.3413 11.9375 24.0625L4.93754 17.0625C4.65575 16.7807 4.49744 16.3985 4.49744 16C4.49744 15.6015 4.65575 15.2193 4.93754 14.9375C5.21933 14.6557 5.60152 14.4974 6.00004 14.4974C6.39855 14.4974 6.78075 14.6557 7.06254 14.9375L13 20.875L25.9375 7.93748C26.0771 7.79795 26.2427 7.68727 26.425 7.61175C26.6073 7.53624 26.8027 7.49738 27 7.49738C27.1974 7.49738 27.3928 7.53624 27.5751 7.61175C27.7574 7.68727 27.923 7.79795 28.0625 7.93748C28.2021 8.07701 28.3127 8.24265 28.3883 8.42496C28.4638 8.60726 28.5026 8.80265 28.5026 8.99998C28.5026 9.1973 28.4638 9.39269 28.3883 9.575C28.3127 9.7573 28.2021 9.92295 28.0625 10.0625L14.0625 24.0625C13.779 24.3413 13.3977 24.4983 13 24.5Z" />
    </svg>
  );
}

export function TickLine(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeDasharray: 32,
        strokeDashoffset: 32,
      }}
      {...props}
    >
      <polyline
        fill="none"
        stroke="currentcolor"
        strokeWidth={3}
        points="6 16 13 23 27 9"
      />
    </svg>
  );
}
