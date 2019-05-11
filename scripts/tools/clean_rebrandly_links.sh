for run in {1..4}
do
  IP=`curl --request GET \
    --url 'https://api.rebrandly.com/v1/links?orderBy=createdAt&orderDir=asc&limit=25' \
    --header 'apikey: 815cc16fb90f4c5ebd4f07daf7a6f7f8' \
    --header 'content-type: application/json'`


  for row in $(echo "${IP}" | jq '.[].id'); do
  curl --request DELETE \
    --url https://api.rebrandly.com/v1/links/$(echo $row | tr -d '"') \
    --header 'apikey: 815cc16fb90f4c5ebd4f07daf7a6f7f8' \
    --header 'content-type: application/json' \
    --header 'workspace: e8989a355dc84230b79bf51d50e07377'
  done
done
