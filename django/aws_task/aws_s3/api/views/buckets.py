from rest_framework.response import Response
from rest_framework import status, generics
import boto3
from django.conf import settings



class BucketView(generics.GenericAPIView):
    authentication_classes=[]
    permission_classes=[]
    client = boto3.client(
            's3',
            aws_access_key_id=settings.ACCESS_KEY,
            aws_secret_access_key=settings.SECRET_ACCESS_KEY,
            )
    def get(self, request):
        try:
            list_buckets = self.client.list_buckets()
            response={}
            # Output the bucket names
            print('Existing buckets:')
            bucket_name=""
            for bucket in list_buckets['Buckets']:
                bucket_name=bucket["Name"]
                print(f'bucket {bucket_name}')
                temp_bucket={}
                temp_bucket["Name"]=bucket_name
                bucket_policy={}
                try:
                    bucket_policy = self.client.get_bucket_policy_status(
                        Bucket=bucket_name
                    )
                except self.client.exceptions.from_code('NoSuchBucketPolicy'): 
                    print(f"bucket_policy: no policy")
                temp_bucket["Policy"]=bucket_policy.get("PolicyStatus")
                print(f"bucket_policy: {bucket_policy}")
                response[bucket_name]=temp_bucket
        except Exception as e:
            print(f'Exception: {e}')
        
        
        return Response({
            "buckets":response,
        }, status=status.HTTP_200_OK)