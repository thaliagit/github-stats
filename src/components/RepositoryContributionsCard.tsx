import { Contributions, PullRequestNode, Repository } from "@/types/github";
import Image from "next/image";
import Link from "next/link";
import { FaCodeMerge } from "react-icons/fa6";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { GoIssueOpened } from "react-icons/go";

export const RepositoryContributionsCard = ({
  repository,
  contributions: { totalCount, nodes },
}: {
  repository: Repository;
  contributions: Contributions;
}) => {
  return (
    <div className="card bg-base-100 overflow-visible">
      <div className="sm:w-auto card bg-base-100 repository-card">
        <div className="card-body">
          <div className="card-title flex items-center justify-between">
            <div className="flex items-center space-x-2 flex-grow">
              <Image
                src={repository.owner.avatarUrl}
                alt={repository.owner.login}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div
                className="grid grid-flow-col gap-2 flex-grow tooltip text-left"
                data-tip={`${repository.owner.login}/${repository.name}`}
              >
                <Link
                  href={`https://github.com/${repository.owner.login}/${repository.name}`}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="hover:underline truncate flex-grow"
                  aria-label={`${repository.name}`}
                >
                  <h3 className="logged-user truncate">
                    {repository.owner.login}/{repository.name}
                  </h3>
                </Link>
              </div>
              <div
                className="tooltip tooltip-left"
                data-tip="Total contributions"
              >
                <div className="rounded outline outline-1 cursor-default px-2">
                  {totalCount}
                </div>
              </div>
            </div>
          </div>
          <div className="max-h-[22rem] hide-scrollbar overflow-auto flex flex-col gap-1">
            {nodes?.map(
              ({ pullRequest: { state, title, id, url } }: PullRequestNode) => (
                <div
                  key={id}
                  className="flex items-center justify-between gap-2"
                >
                  <a
                    href={url}
                    target="_blank"
                    className="truncate"
                    title={title}
                  >
                    {title}
                  </a>
                  <span
                    className={`h-fit rounded p-1 ${
                      state === "MERGED"
                        ? "bg-purple-500"
                        : state === "CLOSED"
                        ? "bg-red-500"
                        : "bg-green-500"
                    }`}
                  >
                    {state === "MERGED" ? (
                      <FaCodeMerge size={18} />
                    ) : state === "CLOSED" ? (
                      <IoIosCloseCircleOutline size={18} />
                    ) : (
                      <GoIssueOpened size={18} />
                    )}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
