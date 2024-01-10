type Props = {
  formatedModifiedDate: string | undefined;
};

function DetailPanelDateModified({ formatedModifiedDate }: Props) {
  return (
    <p className='col-span-1 text-xs text-light-primary-color dark:text-dark-secondary-color md:col-span-2  md:self-end'>
      This information was last modified on {formatedModifiedDate}
    </p>
  );
}

export default DetailPanelDateModified;
