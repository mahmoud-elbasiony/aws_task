from rest_framework.response import Response
from rest_framework import status, generics
import boto3
from django.conf import settings




class ObjectsView(generics.GenericAPIView):
    authentication_classes=[]
    permission_classes=[]
    

    
    def post(self, request,bucket):
        
        response={}
        
        try:
            print(request.data)

            client = boto3.client(
            's3',
                aws_access_key_id=request.data.get("accessId"),
                aws_secret_access_key=request.data.get("secretAccessId"),
            )
            list_objects = client.list_objects(
                Bucket=bucket,
            )
            temp_list_objects=[]
            if list_objects.get("Contents") != None:
                
                for object in list_objects.get("Contents"):
                    temp_object={}
                    print(f'    object {object["Key"]}')
                    temp_object["Key"]=object["Key"]
                    acl= client.get_object_acl(
                                Bucket=bucket,
                                Key=object["Key"],
                            )
                    temp_object["Acl"]={}
                    temp_object["Acl"]["Grants"] =acl["Grants"]
                    temp_object["Acl"]["Owner"] =acl["Owner"]
                    temp_list_objects.append(temp_object)
        except Exception as e:
            print(f'Exception: {e}')
            
            
        return Response({
            "objects":temp_list_objects,
        }, status=status.HTTP_200_OK)