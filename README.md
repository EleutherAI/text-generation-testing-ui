# Text generation Testing UI

## API CALL

curl --header "Content-Type: application/json" \
 --request POST \
 --data '{"context":"eleutherai", "top_p": 0.9, "temp": 0.75}' \
 http://34.90.220.168:5000/complete
