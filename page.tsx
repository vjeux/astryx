import {useState} from 'react';
import {NumberInput} from '@astryxdesign/core/NumberInput';
import {DateInput} from '@astryxdesign/core/DateInput';
import {TimeInput} from '@astryxdesign/core/TimeInput';
import {DateTimeInput} from '@astryxdesign/core/DateTimeInput';
import {FileInput} from '@astryxdesign/core/FileInput';
import {InputGroup} from '@astryxdesign/core/InputGroup';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Button} from '@astryxdesign/core/Button';
import {FormLayout} from '@astryxdesign/core/FormLayout';

const SIZES = ['sm', 'md', 'lg'] as const;
const grid = {display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, alignItems: 'start'};

function Fields({size}: {size: 'sm' | 'md' | 'lg'}) {
  const [n, setN] = useState<number | null>(12);
  const [s, setS] = useState<number | null>(3);
  const [d, setD] = useState<string | undefined>('2026-11-19');
  const [t, setT] = useState<string | undefined>('14:30');
  const [dt, setDt] = useState<string | undefined>('2026-11-19T14:30');
  const [f, setF] = useState<File | File[] | null>(null);
  const [g, setG] = useState('Members');
  return (
    <div style={grid} data-zz-size={size}>
      <div data-zz="number" data-zz-sz={size}><NumberInput label={`Number ${size}`} size={size} value={n} onChange={setN} /></div>
      <div data-zz="number-steppers" data-zz-sz={size}><NumberInput label={`Steppers ${size}`} size={size} value={s} onChange={setS} min={0} max={10} hasNumberSteppers /></div>
      <div data-zz="date" data-zz-sz={size}><DateInput label={`Date ${size}`} size={size} value={d as never} onChange={setD as never} /></div>
      <div data-zz="time" data-zz-sz={size}><TimeInput label={`Time ${size}`} size={size} value={t as never} onChange={setT as never} /></div>
      <div data-zz="datetime" data-zz-sz={size}><DateTimeInput label={`Date and time ${size}`} size={size} value={dt as never} onChange={setDt as never} /></div>
      <div data-zz="file" data-zz-sz={size}><FileInput label={`File ${size}`} size={size} value={f} onChange={setF} /></div>
      <div data-zz="group" data-zz-sz={size}>
        <InputGroup label={`Group ${size}`} size={size}>
          <TextInput label="Audience" isLabelHidden value={g} onChange={setG} />
          <Button label="Save" />
        </InputGroup>
      </div>
    </div>
  );
}

export default function Example() {
  const [f, setF] = useState<File | File[] | null>(null);
  const [name, setName] = useState('Ada');
  const [qty, setQty] = useState<number | null>(2);
  const [d, setD] = useState<string | undefined>('2026-11-19');
  const [t, setT] = useState<string | undefined>('09:15');
  const [g, setG] = useState('Team');
  return (
    <div data-zz-root style={{display: 'flex', flexDirection: 'column', gap: 20, padding: 16}}>
      {SIZES.map(size => <Fields key={size} size={size} />)}
      <div data-zz="file-narrow" data-zz-sz="md" style={{width: 120}}><FileInput label="Narrow file" value={f} onChange={setF} /></div>
      <div data-zz-row="five">
        <FormLayout direction="horizontal">
          <div data-zz="row-text" data-zz-sz="md"><TextInput label="Name" value={name} onChange={setName} /></div>
          <div data-zz="row-number" data-zz-sz="md"><NumberInput label="Quantity" value={qty} onChange={setQty} hasNumberSteppers /></div>
          <div data-zz="row-date" data-zz-sz="md"><DateInput label="Date" value={d as never} onChange={setD as never} /></div>
          <div data-zz="row-time" data-zz-sz="md"><TimeInput label="Time" value={t as never} onChange={setT as never} /></div>
          <div data-zz="row-group" data-zz-sz="md">
            <InputGroup label="Share">
              <TextInput label="Audience" isLabelHidden value={g} onChange={setG} />
              <Button label="Send" />
            </InputGroup>
          </div>
        </FormLayout>
      </div>
      <div data-zz-row="two">
        <FormLayout direction="horizontal">
          <div data-zz="row2-number" data-zz-sz="md"><NumberInput label="Seats" value={qty} onChange={setQty} hasNumberSteppers /></div>
          <div data-zz="row2-group" data-zz-sz="md">
            <InputGroup label="Invite">
              <TextInput label="Email" isLabelHidden value={g} onChange={setG} />
              <Button label="Add" />
            </InputGroup>
          </div>
        </FormLayout>
      </div>
    </div>
  );
}
