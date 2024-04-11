import React, {useEffect, useState} from "react";
import Issue from "@/types/issues";

type IssueCardProps = {
  issue: Issue
  index: number,
  pageSize: number,
}

const IssueCard: React.FC<IssueCardProps> = React.memo(({issue, index, pageSize}) => {
  const {title, body, user, comments, created_at, updated_at, html_url, state, locked} = issue
  const {avatar_url, html_url: user_html_url} = user

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger fade-in animation after component mounts
    setTimeout(() => {
      setIsVisible(true);

    }, 100 * (index % pageSize))
  }, [index, pageSize]);

  return (
    <div className={`card ${isVisible ? 'fade-in' : ''}`}>
      <div className='title-wrapper'>
        <a href={user_html_url} target={"_blank"}>
          <img src={avatar_url} alt={avatar_url} className={'avatar'}/>
        </a>
        <a href={html_url} target={"_blank"}>
          <h1>{title}</h1>
        </a>
        <div className={'chip'}>{state}</div>
        {locked && <div className={'chip'}>Locked</div>}
      </div>
      {body ? <p className={'body'}>{body.substring(0, 250)}</p> : <p className={'body missing'}>This issue presents no description.</p> }
      <div className={'sub-content-wrapper'}>
          <p className={'comment'}>💬 {comments} comments</p>
        <div>
          <p className={'sub-text'}><b>Created at:</b> {created_at}</p>
          <p className={'sub-text'}><b>Updated at:</b> {updated_at}</p>
        </div>
      </div>
    </div>
  );
});

IssueCard.displayName = 'IssueCard';
export default IssueCard;
