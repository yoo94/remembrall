import {getMarkers} from '@/api/marker';
import {queryKeys} from '@/constants/keys';
import {UseQueryCustomOptions} from '@/types/api';
import {Marker, MarkerResponse} from '@/types/domain';
import {useQuery} from '@tanstack/react-query';

function useGetMarkers(
  queryOptions?: UseQueryCustomOptions<Marker[] | MarkerResponse>,
) {
  return useQuery({
    queryFn: getMarkers,
    queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS],
    ...queryOptions,
    staleTime: 0,
  });
}

export default useGetMarkers;