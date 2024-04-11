import React from "react";
import Issue from "@/types/issues";

type IssueFooterProps = {
  issue: Issue
}

const IssueFooter: React.FC<IssueFooterProps> = React.memo(({issue}) => {
  const { created_at, updated_at, comments} = issue

  return <div className={'sub-content-wrapper'}>
    <p className={'comment'}>💬 {comments} comments</p>
    <div>
      <p className={'sub-text'}><b>Created at:</b> {created_at}</p>
      <p className={'sub-text'}><b>Updated at:</b> {updated_at}</p>
    </div>
  </div>

});

IssueFooter.displayName = 'IssueFooter';
export default IssueFooter;
