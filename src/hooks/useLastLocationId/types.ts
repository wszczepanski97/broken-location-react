import { LocationShape } from 'components/Location'

export interface UseLastLocationIdProps {
  lastLocationId?: LocationShape['id']
  getLocationsIdLoading: boolean
}
