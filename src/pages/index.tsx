import {NextPage} from "next";
import {useEffect, useState} from "react";
import Issue from "@/types/issues";
import IssueCard from "@/components/IssueCard";

const Home: NextPage = () => {
  const [issues, setIssues] = useState<Issue[]>([])
  const getIssues = async () => {
    fetch(`${process.env.apiUrl}/vercel/next.js/issues?page=1`,
      {headers: {'Authorization': `Bearer ${process.env.apiKey}`}}
    ).then(async (res) => {
        const newIssues = await res.json()

        setIssues(prevIssues => [...prevIssues, ...newIssues])
    }).catch((e) => {
      console.error(e)
    })
  }

  useEffect(() => {
    getIssues()
  }, [])
  return <div>
    {
      issues.map((issue: Issue) =>
        <IssueCard key={issue.title} issue={issue}/>
      )
    }
  </div>
}

export default Home
