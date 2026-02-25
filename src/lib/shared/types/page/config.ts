import type { SelectOptions } from '../ui';

export interface PageConfig {
	title: string;
	headerActions?: HeaderAction[];
	rowActions?: RowAction[];
	columns?: TableColumn[];
	form?: Form;
	dataKey?: string;
	tableTitle?: string;
}

export interface HeaderAction {
	icon?: string;
	iconClass?: string;
	onClick?: () => void;
	label: string;
	href?: string;
}

export interface TableColumn {
	label: string;
	key: string;
	style?: string;
	nestedKey?: string;
}

export interface Form {
	id?: string;
	title?: string;
	fields: Field[];
	entity?: number | string;
	loadEntity?: boolean;
	action: string;
	onCancel?: () => void;
}

export interface RowAction {
	action?: string;
	icon?: string;
	iconClass?: string;
	name?: string;
	showName?: boolean;
	onClick?: () => void;
}

export type FieldType =
	| 'text'
	| 'number'
	| 'email'
	| 'password'
	| 'textarea'
	| 'select'
	| 'checkbox'
	| 'radio'
	| 'date'
	| 'time'
	| 'file';

export interface BaseField<T> {
	name: string;
	label: string;
	type: FieldType;
	defaultValue?: T;
	required?: boolean;
	placeholder?: string;
	helpText?: string;
	disabled?: boolean;
	readonly?: boolean;
	hidden?: boolean;
}

export interface TextField extends BaseField<string> {
	type: 'text' | 'email' | 'password';
	minLength?: number;
	maxLength?: number;
}

export interface TextAreaField extends BaseField<string> {
	type: 'textarea';
	rows?: number;
	maxLength?: number;
}

export interface NumberField extends BaseField<number> {
	type: 'number';
	min?: number;
	max?: number;
	step?: number;
	showSpinners?: boolean;
}

export interface SelectField extends BaseField<string | string[]> {
	type: 'select';
	options: SelectOptions<string | number>[];
	multiple?: boolean;
}

export interface CheckboxField extends BaseField<boolean> {
	type: 'checkbox';
}

export interface RadioField extends BaseField<boolean> {
	type: 'radio';
	options: SelectOptions<string | number>[];
}

export interface DateTimeField extends BaseField<string> {
	type: 'date' | 'time';
	min?: string;
	max?: string;
}

export interface FileField extends BaseField<string> {
	type: 'file';
	accept?: string;
	multiple?: boolean;
}

export type Field =
	| TextField
	| TextAreaField
	| NumberField
	| SelectField
	| CheckboxField
	| RadioField
	| DateTimeField
	| FileField;

export type FieldTypeMap = {
	text: TextField;
	email: TextField;
	password: TextField;
	textarea: TextAreaField;
	number: NumberField;
	select: SelectField;
	checkbox: CheckboxField;
	radio: RadioField;
	date: DateTimeField;
	time: DateTimeField;
	file: FileField;
};
