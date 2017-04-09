import type {DescribeUpdate, DrawUpdate, PromptUpdate} from "./update.js"

export type JobQueue {
  queue: (DescribeUpdate | DrawUpdate)[],
  length: number
}

export function makeJobQueue {
  return {
    queue : [],
    length : 0
  }
}

export function addJob(queue : JobQueue, job : DescribeUpdate | DrawUpdate) {
  queue.push(job)
  length = length + 1
}

export function finishJob(queue : JobQueue) {
  queue.splice(0, 1)
  length = queue.length
}

export function getJob(queue : JobQueue) : (DescribeUpdate | DrawUpdate) {
  return queue[0]
}
