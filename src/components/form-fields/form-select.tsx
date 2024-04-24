import React, {
	type DetailedHTMLProps,
	type SelectHTMLAttributes
} from 'react';

import { FormSelectClient } from '@/components/form-fields/form-select-client';

type FormSelectProps = DetailedHTMLProps<
	SelectHTMLAttributes<HTMLSelectElement>,
	HTMLSelectElement
> & {
	name: string;
	label: string;
};

export const FormSelect = async ({
	name,
	label,
	...selectProps
}: FormSelectProps) => {
	return (
		<div className="flex flex-col gap-2">
			<label htmlFor="type">{label}</label>
			<FormSelectClient options={[]} {...selectProps} name={name} />
		</div>
	);
};
