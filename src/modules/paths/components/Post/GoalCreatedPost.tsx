import React from 'react'
import Link from 'next/link'

import Post from './Post'
import { FaBullseye } from 'react-icons/fa'

const GoalCreatedPost: React.FC = () => {
  return (
    <Post
      message={
        <>
          <Link href="#">
            <a className="mr-1">John Smith</a>
          </Link>
          created a new goal
        </>
      }
      messageIcon={<FaBullseye className="text-gold" />}
      sideContent={
        <p className="text-gold text-sm font-semibold">Aug 15 - Sep 15</p>
      }
    >
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between bg-gray-50 py-3 px-6 rounded-sm dark:bg-gray-800">
          <div className="flex items-center gap-4">
            <div>
              <h5 className="text-gold text-sm">
                React JS Bootcamp for beginners
              </h5>

              <p className="text-gray-500 dark:text-gray-400 text-xs">
                Aug 15 - Sep 15
              </p>
            </div>

            <span className="bg-gray-500 text-gray-100 py-1 px-2 text-xs rounded-md font-semibold dark:bg-gray-700">
              Video Course
            </span>
          </div>

          <div>
            <p className="text-sm font-semibold">24 Hours</p>

            <p className="text-gray-500 dark:text-gray-400 text-right text-sm">
              Free
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between bg-gray-50 py-3 px-6 rounded-sm dark:bg-gray-800">
          <div className="flex items-center gap-4">
            <div>
              <h5 className="text-gold text-sm">
                React JS Bootcamp for beginners
              </h5>

              <p className="text-gray-500 dark:text-gray-400 text-xs">
                Aug 15 - Sep 15
              </p>
            </div>

            <span className="bg-gray-500 text-gray-100 py-1 px-2 text-xs rounded-md font-semibold dark:bg-gray-700">
              Video Course
            </span>
          </div>

          <div>
            <p className="text-sm font-semibold">24 Hours</p>

            <p className="text-gray-500 dark:text-gray-400 text-right text-sm">
              Free
            </p>
          </div>
        </div>
      </div>
    </Post>
  )
}

export default GoalCreatedPost
