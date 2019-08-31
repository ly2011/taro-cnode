import { get } from '@/utils/request'
import { baseUrl } from '@/config'

export default function getTopicByTabName(params) {
  const { page, tab } = params
  return get({
    url: `${baseUrl}topics${tab ? `?tab=${tab}&page=${page}&limit=10` : ``}`,
    payload: {
      tab
    }
  })
}
