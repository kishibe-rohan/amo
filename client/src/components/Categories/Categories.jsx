import styled from 'styled-components'
import {mobile} from '../../responsive'
import CategoryItem from './CategoryItem'

const Container = styled.div` 
display:flex;
padding:20px;
justify-content:space-between;
${mobile({padding:"0px",flexDirection:"column"})}
`

const Categories = ({categories}) => {
    return (
        <Container>
            {categories?.map((category) => (
                <CategoryItem category={category} key={category.id} />
            ))}
        </Container>
    )
}

export default Categories;