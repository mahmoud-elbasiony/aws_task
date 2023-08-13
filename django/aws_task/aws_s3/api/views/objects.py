from rest_framework.response import Response
from rest_framework import status, generics
import boto3
from django.conf import settings




class ObjectsView(generics.GenericAPIView):
    authentication_classes=[]
    permission_classes=[]
    client = boto3.client(
            's3',
            aws_access_key_id=settings.ACCESS_KEY,
            aws_secret_access_key=settings.SECRET_ACCESS_KEY,

            )

    
    def get(self, request,bucket):
        
        
        try:
            response={}
            list_objects = self.client.list_objects(
                Bucket=bucket,
            )
            temp_list_objects=[]
            if list_objects.get("Contents") != None:
                
                for object in list_objects.get("Contents"):
                    temp_object={}
                    print(f'    object {object["Key"]}')
                    temp_object["Key"]=object["Key"]
                    acl= self.client.get_object_acl(
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