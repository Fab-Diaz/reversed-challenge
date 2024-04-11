import {NextPage} from "next";
import {useCallback, useEffect, useState} from "react";
import Issue from "@/types/issues";
import {FormType} from "@/types/form";
import {Form, IssueCard} from "@/components/index";
import {useFetch} from "@/hooks/index";
import {ApiError} from "@/types/errors";

const Home: NextPage = () => {

  const [savedForm, setSavedForm] = useState<FormType | null>(null)
  const [issues, setIssues] = useState<Issue[]>([])
  const [page, setPage] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { apiError, fetchData } = useFetch();

  const getIssues = useCallback(async (form: FormType, clear: boolean = true) => {
    setIsLoading(true)
    if (clear) {
      setIssues([])
    }

    const errors: ApiError[] = [
      {
        status: 404,
        message: 'Issues not found. Try again with another organization or repository.'
      },
      {
        status: 403,
        message: 'Request is forbidden. Check that the provided api key is not expired. Contact Fabien for more details ;)'
      }
    ]

    fetchData(`/${form.org}/${form.repo}/issues?page=${page}&sort=${form.sort}&per_page=${form.pageSize}`, errors)
      .then(async (res) => {
        if (res) {
          setSavedForm(form)
          setIssues(prevIssues => [...prevIssues, ...res])
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [fetchData, page])


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
