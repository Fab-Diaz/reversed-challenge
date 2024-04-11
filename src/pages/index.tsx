import {NextPage} from "next";
import {ChangeEvent, FormEvent, useCallback, useEffect, useMemo, useState} from "react";
import Issue from "@/types/issues";
import IssueCard from "@/components/IssueCard";
import {Form, FormErrors, Sort} from "@/types/form";

const Home: NextPage = () => {
  const DEFAULT_FORM: Form = useMemo(() => ({
    org: '',
    repo: '',
    sort: 'created',
  }), [])

  const [issues, setIssues] = useState<Issue[]>([])
  const [page, setPage] = useState<number>(1)
  const [form, setForm] = useState<Form>(DEFAULT_FORM)
  const [errors, setErrors] = useState<FormErrors>({
    ...DEFAULT_FORM,
    api: ''
  })
  const [isLoading, setIsLoading] = useState<boolean>()

  const getIssues = useCallback(async (clear?: boolean) => {
    if (clear) {
      setIssues([])
    }
    fetch(`${process.env.apiUrl}/${form.org}/${form.repo}/issues?page=${page}&sort=${form.sort}`,
      {headers: {'Authorization': `Bearer ${process.env.apiKey}`}}
    ).then(async (res) => {

      if (res.status === 404) {
        setErrors({
          ...DEFAULT_FORM,
          api: 'Issues not found. Try again with another organization or repository.'
        })
      } else {
        setErrors({...DEFAULT_FORM, api: null})
        const newIssues = await res.json()

        setIssues(prevIssues => [...prevIssues, ...newIssues])
      }
    }).catch((e) => {
      console.error(e)
      setErrors({
        ...DEFAULT_FORM,
        api: 'Something went wrong. Please try again!'
      })
    }).finally(() => {
      setIsLoading(false)
    })
  }, [DEFAULT_FORM, form.org, form.repo, form.sort, page])

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
      getIssues()
    }
  }

  const handleFormChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.preventDefault()
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    function handleScroll() {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - 20 && !isLoading) {
        setIsLoading(true)
        setPage(prevPage => prevPage + 1)
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading]);

  useEffect(() => {
    if (page !== 1) {
      getIssues(false);
    }
  }, [getIssues, page]);

  return <div className={'wrapper'}>
    <form onSubmit={submit} className={'form-wrapper'}>
      <div className={'mb-2'}>
      <h1>Reversed Issue Finder</h1>
      <p className={'sub-text'}>Search all issues related to a github repository in just a few clicks!</p>
      </div>
      <input type="text" id="org" name="org" value={form.org} onChange={handleFormChange} placeholder={"Select an organization"}/>
      <p className={'text-red-600'}>{errors.org}</p>
      <input type="text" id="repo" name="repo" value={form.repo} onChange={handleFormChange} placeholder={"Select a repository"}/>
      <p className={'text-red-600'}>{errors.repo}</p>

      <select name="sort" id="sort" onChange={handleFormChange}>
        <option value="created">Created</option>
        <option value="upated">Updated</option>
        <option value="comments">Comments</option>
      </select>
      <button type="submit" className={`button-primary ${isLoading ? 'disabled' : ''}`}>
        {isLoading ? 'Loading..' : 'Search issues!'}
      </button>
      {errors.api && <p className={'text-red-600'}>{errors.api}</p>}
    </form>
    <div>
      {
        issues.map((issue: Issue) =>
          <IssueCard key={issue.title} issue={issue}/>
        )
      }
    </div>
  </div>
}

export default Home
