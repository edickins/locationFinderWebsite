type Props = {
  formatedModifiedDate: string | undefined;
};

function DetailPanelDateModified({ formatedModifiedDate }: Props) {
  return (
    <p className='text-xs dark:text-dark-secondary-color md:self-end'>
      This information was last modified on {formatedModifiedDate}
    </p>
  );
}

export default DetailPanelDateModified;
