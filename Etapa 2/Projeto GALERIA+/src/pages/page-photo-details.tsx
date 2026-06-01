import { useParams } from "react-router";
import Text from "../components/text";
import Container from "../components/container";
import type { Photo } from "../contexts/photos/models/photo";
import Skeleton from "../components/skeleton";
import PhotosNavigator from "../contexts/photos/components/photo-navigator";
import ImagePreview from "../components/image-preview";
import Button from "../components/button";


export default function PagePhotoDetails() {
    const {id} = useParams()
    const isLoadingPhoto = false //_temp
    const photo = {
        id: '41',
        title: 'gato pensante',
        imageId: 'square-cat.png',
        albums: [
            {id: '67', title: 'AlbUM'},
            {id: "69", title: 'Albudois'},
            {id: "zerocentos e zerenta e zero", title: 'Atchim'},
        ]
    } as Photo

    return <>
        <Container>
            <header className="flex items-center justify-between gap-8 mb-8">
                {!isLoadingPhoto ? (
                    <Text variant="heading-large">{photo?.title}</Text>
                ): (
                    <Skeleton className="w-48 h-8"/>
                )}
                <PhotosNavigator loading={isLoadingPhoto}/>
            </header>

            <div className="grid grid-cols-[21rem] gap-24">
                <div className="space-y-3">
                    {!isLoadingPhoto ?
                    <ImagePreview
                        src={`/images/${photo?.imageId}`}
                        title={photo?.title}
                        imageClassName='h-84'
                    /> : (
                    <Skeleton className="h-84"/>
                    )}

                    {!isLoadingPhoto ? <Button variant="destructive">Excluir</Button> : <Skeleton className="w-20 h-10"/>}
                </div>
            </div>
        </Container>
        
    </>
}