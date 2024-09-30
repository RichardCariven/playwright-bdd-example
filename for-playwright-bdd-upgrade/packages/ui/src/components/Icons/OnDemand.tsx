export function OnDemandIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M12 22.5A10.5 10.5 0 1 1 22.5 12 10.52 10.52 0 0 1 12 22.5Zm0-19.385A8.885 8.885 0 1 0 20.885 12 8.895 8.895 0 0 0 12 3.115Z" />
      <path d="M15.496 11.478a.6.6 0 0 1 0 1.03L11 15.204a.6.6 0 0 1-.91-.514V9.294A.6.6 0 0 1 11 8.78l4.496 2.698Z" />
    </svg>
  );
}

export function OnDemandFilledIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 22.5A10.5 10.5 0 1 1 22.5 12 10.52 10.52 0 0 1 12 22.5Zm3.565-9.993a.6.6 0 0 0 0-1.029l-4.596-2.757a.6.6 0 0 0-.909.514v5.515a.6.6 0 0 0 .91.515l4.595-2.758Z"
      />
    </svg>
  );
}
