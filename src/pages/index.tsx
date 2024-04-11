import {NextPage} from "next";
import {useCallback, useEffect, useState} from "react";
import Issue from "@/types/issues";
import IssueCard from "@/components/IssueCard";
import {FormType} from "@/types/form";
import Form from "@/components/Form";

const Home: NextPage = () => {

  const [savedForm, setSavedForm] = useState<FormType | null>(null)
  const [issues, setIssues] = useState<Issue[]>([])
  const [apiError, setApiError] = useState<string>('')
  const [page, setPage] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const getIssues = useCallback(async (form: FormType, clear: boolean = true) => {
    setIsLoading(true)
    setApiError('')
    if (clear) {
      setIssues([])
    }
    fetch(`${process.env.apiUrl}/${form.org}/${form.repo}/issues?page=${page}&sort=${form.sort}&per_page=${form.pageSize}`,
      {headers: {'Authorization': `Bearer ${process.env.apiKey}`}}
    ).then(async (res) => {

      if (res.status === 404) {
        setApiError('Issues not found. Try again with another organization or repository.')
      } else {
        const newIssues = await res.json()

        setSavedForm(form)
        setIssues(prevIssues => [...prevIssues, ...newIssues])
      }
    }).catch((e) => {
      console.error(e)
      setApiError('Something went wrong. Please try again!')
    }).finally(() => {
      setIsLoading(false)
    })
  }, [page])


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
    if (page !== 1 && savedForm) {
      getIssues(savedForm, false);
    }
  }, [getIssues, page, savedForm]);

  return <div className={'wrapper'}>
    <Form isLoading={isLoading} apiError={apiError} onSubmit={getIssues} />
    <div>
      {
        issues.map((issue: Issue, index) =>
          <IssueCard key={issue.title} issue={issue} index={index} pageSize={savedForm?.pageSize ?? 15}/>
        )
      }
    </div>
  </div>
}

export default Home
