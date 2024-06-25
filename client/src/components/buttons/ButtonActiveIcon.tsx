type Props = {
  icon: string;
  isActive: boolean | undefined;
};

function ButtonActiveIcon({ icon, isActive }: Props) {
  const base64Svg = `data:image/svg+xml;base64,${btoa(icon)}`;

  return (
    <div className='ml-1 inline-block bg-transparent'>
      {isActive ? (
        <>
          <img
            src={base64Svg}
            alt='active button indicator'
            className='inline-block h-4 w-4 '
            aria-label='active icon'
          />
        </>
      ) : (
        <div className='h-4 w-4 ' />
      )}
    </div>
  );
}

export default ButtonActiveIcon;
