import React, {ChangeEvent, FormEvent, useMemo, useState} from "react";
import { FormType} from "@/types/form";
import {FormErrors} from "@/types/errors";

type FormProps = {
  isLoading: boolean
  apiError: string
  onSubmit: (form: FormType, clear?: boolean) => void
}

const Form: React.FC<FormProps> = React.memo(({isLoading, apiError, onSubmit}) => {
  const DEFAULT_FORM: FormType = useMemo(() => ({
    org: '',
    repo: '',
    sort: 'created',
    pageSize: 15,
  }), [])

  const [form, setForm] = useState<FormType>(DEFAULT_FORM)
  const [errors, setErrors] = useState<FormErrors>(DEFAULT_FORM)


  const validate = () => {
    const errors = {
      org: form.org === '' ? 'Please enter an organization' : '',
      repo: form.repo === '' ? 'Please enter a repository' : '',
    }
    setErrors(errors)
    return errors.org === '' && errors.repo === ''
  }

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!isLoading && validate()) {
      onSubmit(form)
    }
  }

  const handleFormChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.preventDefault()
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  return (
    <form onSubmit={submit} className={'form-wrapper'}>
      <div className={'mb-2'}>
        <h1>Reversed Issue Finder</h1>
        <p className={'sub-text'}>Search all issues related to a github repository in just a few clicks!</p>
      </div>
      <p>Organization</p>
      <input type="text" id="org" name="org" value={form.org} onChange={handleFormChange} placeholder={"Select an organization"}/>
      <p className={'text-red-600'}>{errors.org}</p>
      <p>Repository</p>
      <input type="text" id="repo" name="repo" value={form.repo} onChange={handleFormChange} placeholder={"Select a repository"}/>
      <p className={'text-red-600'}>{errors.repo}</p>

      <div className={'row'}>
        <div className={'w-full'}>
          <p>Sort by</p>
          <select name="sort" id="sort" onChange={handleFormChange} value={form.sort} className={'w-full'}>
            <option value="created">Created</option>
            <option value="upated">Updated</option>
            <option value="comments">Comments</option>
          </select>
        </div>
        <div className={'w-[150px]'}>
          <p>Page size</p>
          <select name="pageSize" id="pageSize" onChange={handleFormChange} value={form.pageSize} className={'w-full'}>
            <option value="5">5</option >
            <option value="15">15</option>
            <option value="30">30</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
      </div>
      <button type="submit" className={`button-primary ${isLoading ? 'disabled' : ''}`}>
        {isLoading ? 'Loading..' : 'Search issues!'}
      </button>
      {apiError && <p className={'text-red-600'}>{apiError}</p>}
    </form>  );
});

Form.displayName = 'Form';
export default Form;