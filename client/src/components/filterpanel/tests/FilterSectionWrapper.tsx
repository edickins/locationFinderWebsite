import React, { PropsWithChildren, useState } from 'react';

type Props = {
  mockUpdateSearchParams: (key: string, value: string) => void;
};

function FilterSectionWrapper({
  mockUpdateSearchParams,
  children
}: PropsWithChildren<Props>) {
  const [localSearchParams, setLocalSearchParams] = useState(
    new URLSearchParams()
  );
  return React.cloneElement(children, {
    updateSearchParams: mockUpdateSearchParams,
    localSearchParams
  });
}

export default FilterSectionWrapper;
