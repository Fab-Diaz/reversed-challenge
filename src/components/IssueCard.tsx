import React, {useEffect, useState} from "react";
import Issue from "@/types/issues";
import {IssueHeader, IssueFooter} from "@/components";

type IssueCardProps = {
  issue: Issue
  index: number,
  pageSize: number,
}

const IssueCard: React.FC<IssueCardProps> = React.memo(({issue, index, pageSize}) => {
  const { body } = issue
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger fade-in animation after component mounts
    setTimeout(() => {
      setIsVisible(true);

    }, 100 * (index % pageSize))
  }, [index, pageSize]);

  return (
    <div className={`card ${isVisible ? 'fade-in' : ''}`}>
      <IssueHeader issue={issue} />
      {body
        ? <p className={'body'}>{body.substring(0, 250)}</p>
        : <p className={'body missing'}>This issue presents no description.</p> }
      <IssueFooter issue={issue} />
    </div>
  );
});

IssueCard.displayName = 'IssueCard';
export default IssueCard;
