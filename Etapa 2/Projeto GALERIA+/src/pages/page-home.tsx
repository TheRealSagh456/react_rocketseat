import Container from "../components/container";
import AlbumsFilter from "../contexts/albums/components/albums-filter";
import PhotosList from "../contexts/photos/components/photos-list";


export default function PageHome() {
    return ( 
        <Container>
            <AlbumsFilter albums={[
                {id: '67', title: 'AlbUM'},
                {id: "69", title: 'Albudois'},
                {id: "zerocentos e zerenta e zero", title: 'Atchim'}]} className="mb-9"
            />

            <PhotosList photos={[
                        {id: '41',
                        title: 'gato pensante',
                        imageId: 'square-cat.png',
                        albums: [
                            {id: '67', title: 'AlbUM'},
                            {id: "69", title: 'Albudois'},
                            {id: "zerocentos e zerenta e zero", title: 'Atchim'},
                        ],}
                    ]}/>
        </Container>
    )
}