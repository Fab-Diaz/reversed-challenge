import React from "react";
import Issue from "@/types/issues";
import {capitalize} from "@/utils/stringUtils";

type IssueHeaderProps = {
  issue: Issue
}

const IssueHeader: React.FC<IssueHeaderProps> = React.memo(({issue}) => {
  const {title, body, user, comments, html_url, state, locked} = issue
  const {avatar_url, html_url: user_html_url} = user

  return <div className='title-wrapper'>
    <a href={user_html_url} target={"_blank"}>
      <img src={avatar_url} alt={avatar_url} className={'avatar'}/>
    </a>
    <a href={html_url} target={"_blank"}>
      <h1>{title}</h1>
    </a>
    <div className={'chip'}>{capitalize(state)}</div>
    {locked && <div className={'chip'}>Locked</div>}
  </div>
});

IssueHeader.displayName = 'IssueHeader';
export default IssueHeader;
