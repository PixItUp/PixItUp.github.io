//@flow

import type {DescribeUpdate, DrawUpdate, PromptUpdate} from "./update.js"

export type JobQueue = {
  queue: (DescribeUpdate | DrawUpdate)[],
  length: number
}

export function makeJobQueue() {
  return {
    queue : [],
    length : 0
  }

}

export function addJob(queue : JobQueue, job : DescribeUpdate | DrawUpdate) {
  queue.queue.push(job)
  queue.length = queue.queue.length
}

export function finishJob(queue : JobQueue) {
  queue.queue.splice(0, 1)
  queue.length = queue.queue.length
}

export function getJob(queue : JobQueue) : (DescribeUpdate | DrawUpdate) {
  return queue.queue[0]
}
